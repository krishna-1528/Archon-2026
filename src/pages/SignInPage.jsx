import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { auth, db, googleProvider } from '../firebase';

const isRegistrationComplete = (profile = {}) =>
  Boolean(
    profile.name &&
      profile.email &&
      profile.phone &&
      profile.gender &&
      profile.dateOfBirth &&
      profile.collegeState &&
      profile.collegeDistrict &&
      profile.collegeName
  );

const galaxyStars = [
  { top: '8%', left: '14%' },
  { top: '16%', left: '76%' },
  { top: '24%', left: '58%' },
  { top: '32%', left: '22%' },
  { top: '38%', left: '84%' },
  { top: '46%', left: '64%' },
  { top: '54%', left: '10%' },
  { top: '61%', left: '71%' },
  { top: '70%', left: '35%' },
  { top: '79%', left: '88%' },
  { top: '86%', left: '54%' },
  { top: '92%', left: '18%' },
];

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (signinError) {
      setError(signinError.message || 'Unable to sign in right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userRef = doc(db, 'users', user.uid);
      const existingUser = await getDoc(userRef);

      if (existingUser.exists() && isRegistrationComplete(existingUser.data())) {
        navigate('/dashboard');
        return;
      }

      navigate('/register', {
        state: {
          isGoogleRegistration: true,
          googleUid: user.uid,
          googleProfile: {
            name: user.displayName || '',
            email: user.email || '',
          },
        },
      });
    } catch (googleError) {
      setError(googleError.message || 'Unable to continue with Google right now.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-black/60" />
      <motion.div
        className="absolute -top-36 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-primary/10 blur-3xl"
        animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.5, 0.35] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-44 -left-12 w-120 h-120 rounded-full bg-secondary/10 blur-3xl"
        animate={{ scale: [1.05, 1, 1.05], opacity: [0.4, 0.25, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-10 -right-16 w-105 h-105 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />

      <div className="absolute inset-0 -z-10 pointer-events-none">
        {galaxyStars.map((star, index) => (
          <motion.span
            key={`${star.top}-${star.left}`}
            className="absolute w-1 h-1 rounded-full bg-white/70"
            style={{ top: star.top, left: star.left }}
            animate={{ opacity: [0.2, 0.9, 0.2], scale: [0.8, 1.3, 0.8] }}
            transition={{ duration: 2.4 + (index % 4) * 0.6, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="w-full max-w-md rounded-2xl border border-primary/25 bg-background/60 backdrop-blur-md p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-primary mb-2">Sign In</h1>
        <p className="text-white/70 text-sm mb-6">Use your Archon account credentials.</p>

        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-white/20 bg-black/30 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
            required
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md border-2 border-primary bg-primary px-4 py-2.5 text-black font-bold uppercase text-xs tracking-wider disabled:opacity-70"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full rounded-md border-2 border-primary px-4 py-2.5 text-primary font-bold uppercase text-xs tracking-wider hover:bg-primary hover:text-black transition-all disabled:opacity-70"
          >
            Continue with Google
          </button>
        </form>

        <p className="mt-5 text-sm text-white/70">
          New here?{' '}
          <Link to="/register" className="text-primary font-semibold hover:underline">
            Create Account
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignInPage;
