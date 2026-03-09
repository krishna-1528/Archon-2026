import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import {
  ACCESS_PROTOCOL_MESSAGE,
  ENTRY_PASS_TOOLTIP,
  GENERAL_ENTRY_PASS_FORM_URL,
  TACTICAL_BANNER_TEXT,
} from '../constants/accessPolicy';

const isRegistrationComplete = (profile = {}) =>
  Boolean(
    profile.registrationCompleted &&
      profile.name &&
      profile.email &&
      profile.phone &&
      profile.gender &&
      profile.dateOfBirth &&
      profile.collegeState &&
      profile.collegeDistrict &&
      profile.collegeName
  );

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!isMounted) return;

      if (!user) {
        navigate('/signin', { replace: true });
        setIsCheckingAccess(false);
        return;
      }

      try {
        const userSnapshot = await getDoc(doc(db, 'users', user.uid));
        const profile = userSnapshot.exists() ? userSnapshot.data() : null;

        if (!isMounted) return;

        if (!profile || !isRegistrationComplete(profile)) {
          navigate('/register', {
            replace: true,
            state: {
              isGoogleRegistration: user.providerData?.some((provider) => provider.providerId === 'google.com'),
              googleUid: user.uid,
              googleProfile: {
                name: user.displayName || '',
                email: user.email || '',
              },
            },
          });
          return;
        }

        setProfile(profile);
      } catch {
        if (isMounted) navigate('/signin', { replace: true });
      } finally {
        if (isMounted) setIsCheckingAccess(false);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [navigate]);

  if (isCheckingAccess) {
    return (
      <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16">
        <div className="text-white/70 text-sm uppercase tracking-wider">Loading dashboard...</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-3xl rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 md:p-8 text-center">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight text-primary mb-3">Dashboard</h1>
        <p className="text-white/70 mb-6">Welcome to your Archon portal.</p>

        <div className="rounded-xl border border-primary/35 bg-primary/10 px-4 py-3 text-xs md:text-sm font-semibold text-primary mb-4">
          {TACTICAL_BANNER_TEXT}
        </div>

        <div className="rounded-xl border border-white/15 bg-black/25 px-4 py-4 text-left text-white/85 whitespace-pre-line mb-6">
          {ACCESS_PROTOCOL_MESSAGE}
        </div>

        <div className="mb-6 rounded-lg border border-secondary/30 bg-secondary/10 px-4 py-3 text-left">
          <p className="text-[10px] uppercase tracking-wider text-secondary/90">Archon ID</p>
          <p className="text-lg md:text-xl font-black text-secondary break-all">{profile?.archon_id || profile?.archonId || 'Pending'}</p>
          <p className="text-xs text-white/60 mt-1">Use this ID in all event registration forms.</p>
        </div>

        <div className="mb-6 rounded-lg border border-white/15 bg-black/25 px-4 py-4 text-left">
          <p className="text-[10px] uppercase tracking-wider text-primary/90 mb-3">Registered Details</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p className="text-white/80"><span className="text-white/50">Name:</span> {profile?.name || 'Not provided'}</p>
            <p className="text-white/80"><span className="text-white/50">Email:</span> {profile?.email || 'Not provided'}</p>
            <p className="text-white/80"><span className="text-white/50">Phone:</span> {profile?.phone || 'Not provided'}</p>
            <p className="text-white/80"><span className="text-white/50">Gender:</span> {profile?.gender || 'Not provided'}</p>
            <p className="text-white/80"><span className="text-white/50">Date of Birth:</span> {profile?.dateOfBirth || 'Not provided'}</p>
            <p className="text-white/80"><span className="text-white/50">College:</span> {profile?.collegeName || 'Not provided'}</p>
            <p className="text-white/80"><span className="text-white/50">State:</span> {profile?.collegeState || 'Not provided'}</p>
            <p className="text-white/80"><span className="text-white/50">District:</span> {profile?.collegeDistrict || 'Not provided'}</p>
          </div>
          <p className="mt-3 text-xs text-white/55">Email notifications will be enabled after official mail integration is configured.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={GENERAL_ENTRY_PASS_FORM_URL}
            target="_blank"
            rel="noreferrer noopener"
            title={ENTRY_PASS_TOOLTIP}
            aria-label={`Entry Pass. ${ENTRY_PASS_TOOLTIP}`}
            className="inline-flex rounded-md border-2 border-secondary bg-secondary px-5 py-2 text-xs font-bold uppercase tracking-wider text-black hover:bg-transparent hover:text-secondary transition-all"
          >
            Entry Pass
          </a>

          <Link
            to="/events"
            className="inline-flex rounded-md border-2 border-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-all"
          >
            Explore Events
          </Link>
        </div>

        <div className="mt-5">
          <Link
            to="/"
            className="inline-flex rounded-md border-2 border-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-black transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
