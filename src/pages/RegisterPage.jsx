import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { auth, db, googleProvider } from '../firebase';

const generateArchonId = () => {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `AR26-${digits}`;
};

const galaxyStars = [
  { top: '7%', left: '12%' },
  { top: '12%', left: '72%' },
  { top: '18%', left: '46%' },
  { top: '25%', left: '88%' },
  { top: '31%', left: '27%' },
  { top: '39%', left: '61%' },
  { top: '47%', left: '14%' },
  { top: '55%', left: '79%' },
  { top: '63%', left: '43%' },
  { top: '72%', left: '68%' },
  { top: '81%', left: '23%' },
  { top: '90%', left: '86%' },
];

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [gender, setGender] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [collegeState, setCollegeState] = useState('');
  const [collegeDistrict, setCollegeDistrict] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [instagramHandle, setInstagramHandle] = useState('');
  const [facebookHandle, setFacebookHandle] = useState('');
  const [linkedInHandle, setLinkedInHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please accept the Terms and Policies.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const archonId = generateArchonId();

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        archon_id: archonId,
        paidStatus: false,
        passType: 'General',
        phone,
        referralCode,
        gender,
        dateOfBirth,
        collegeState,
        collegeDistrict,
        collegeName,
        instagramHandle,
        facebookHandle,
        linkedInHandle,
      });

      navigate('/dashboard');
    } catch (signupError) {
      setError(signupError.message || 'Unable to register right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const existingUser = await getDoc(userRef);

      if (!existingUser.exists()) {
        await setDoc(userRef, {
          name: user.displayName || 'Archon User',
          email: user.email || '',
          archonId: generateArchonId(),
          paidStatus: false,
          passType: 'General',
          authProvider: 'google',
        });
      }

      navigate('/dashboard');
    } catch (googleError) {
      setError(googleError.message || 'Unable to continue with Google right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[85vh] px-4 py-10 md:py-14 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-b from-background via-background to-black/60" />
      <motion.div
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-150 h-150 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-40 right-10 w-105 h-105 rounded-full bg-secondary/10 blur-3xl"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.4, 0.25, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-16 left-1/2 -translate-x-1/2 w-190 h-190 rounded-full border border-white/10"
        animate={{ rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-0 pointer-events-none">
        {galaxyStars.map((star, index) => (
          <motion.span
            key={`${star.top}-${star.left}`}
            className="absolute w-1 h-1 rounded-full bg-white/70"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.35, 0.8] }}
            transition={{ duration: 2.2 + (index % 5) * 0.55, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto rounded-2xl border border-primary/20 bg-background/60 backdrop-blur-md p-5 md:p-8">
        <h1 className="text-center text-3xl md:text-5xl font-black tracking-tight text-white mb-8">REGISTER</h1>

        <form onSubmit={handleSignUp} className="space-y-4 md:space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Your Name*"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              required
            />
            <input
              type="tel"
              placeholder="Phone Number*"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              required
            />
            <input
              type="text"
              placeholder="Referral Code"
              value={referralCode}
              onChange={(event) => setReferralCode(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={gender}
              onChange={(event) => setGender(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              required
            >
              <option value="" className="bg-background">Select Gender*</option>
              <option value="Male" className="bg-background">Male</option>
              <option value="Female" className="bg-background">Female</option>
              <option value="Other" className="bg-background">Other</option>
            </select>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              required
            />
            <input
              type="text"
              placeholder="College Name*"
              value={collegeName}
              onChange={(event) => setCollegeName(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="College State*"
              value={collegeState}
              onChange={(event) => setCollegeState(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              required
            />
            <input
              type="text"
              placeholder="College District*"
              value={collegeDistrict}
              onChange={(event) => setCollegeDistrict(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              required
            />
            <input
              type="text"
              placeholder="LinkedIn Handle"
              value={linkedInHandle}
              onChange={(event) => setLinkedInHandle(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Instagram Handle"
              value={instagramHandle}
              onChange={(event) => setInstagramHandle(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
            />
            <input
              type="text"
              placeholder="Facebook Handle"
              value={facebookHandle}
              onChange={(event) => setFacebookHandle(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
            />
            <input
              type="email"
              placeholder="Email*"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="password"
              placeholder="Password*"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-md border border-primary/30 bg-primary/10 px-4 py-2.5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary"
              minLength={6}
              required
            />
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full rounded-md border-2 border-primary px-4 py-2.5 text-primary font-bold uppercase text-xs tracking-wider hover:bg-primary hover:text-black transition-all disabled:opacity-70"
            >
              Continue with Google
            </button>
          </div>

          <label className="flex items-center gap-2 text-sm text-white/80">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(event) => setAgreeTerms(event.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            I agree to the Terms and Policies.
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="rounded-md border-2 border-primary bg-primary px-8 py-2.5 text-black font-bold uppercase text-xs tracking-wider disabled:opacity-70"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-white/70">
          Already Registered?{' '}
          <Link to="/signin" className="text-primary font-semibold hover:underline">
            Login to your Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
