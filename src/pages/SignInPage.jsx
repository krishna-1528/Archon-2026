import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { auth, googleProvider } from '../firebase';

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
  const robotAreaRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);
  const [robotLook, setRobotLook] = useState({ x: 0, y: 0, tilt: 0, nod: 0 });

  const handleSignIn = async (event) => {
    event.preventDefault();
    setError('');
    setInfo('');
    setShowForgotPassword(false);
    setLoading(true);

    const normalizedEmail = email.trim();

    try {
      const methods = await fetchSignInMethodsForEmail(auth, normalizedEmail);

      if (methods.length && !methods.includes('password')) {
        if (methods.includes('google.com')) {
          setError('This account was created with Google. Please use Continue with Google.');
        } else {
          setError('This account does not use password sign-in. Use your original sign-in method.');
        }
        return;
      }

      await signInWithEmailAndPassword(auth, normalizedEmail, password);
      navigate('/dashboard');
    } catch (signinError) {
      if (signinError.code === 'auth/user-not-found') {
        setError('No account found for this email. Please register first.');
        setShowForgotPassword(false);
      } else if (signinError.code === 'auth/operation-not-allowed') {
        setError('Email/Password sign-in is disabled in Firebase. Please enable it in Firebase Console > Authentication > Sign-in method.');
        setShowForgotPassword(false);
      } else if (signinError.code === 'auth/wrong-password' || signinError.code === 'auth/invalid-credential') {
        setError('Incorrect email or password. Please try again.');
        setShowForgotPassword(Boolean(normalizedEmail));
      } else if (signinError.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
        setShowForgotPassword(false);
      } else {
        setError(signinError.message || 'Unable to sign in right now.');
        setShowForgotPassword(false);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError('Enter your email first, then click Forgot Password.');
      return;
    }

    setError('');
    setInfo('');
    setIsSendingReset(true);

    try {
      await sendPasswordResetEmail(auth, normalizedEmail);
      setInfo('Password reset link sent to your email.');
      setShowForgotPassword(false);
    } catch (resetError) {
      if (resetError.code === 'auth/user-not-found') {
        setError('No account found for this email. Please register first.');
      } else if (resetError.code === 'auth/operation-not-allowed') {
        setError('Password reset is disabled in Firebase. Enable Email/Password in Firebase Console > Authentication > Sign-in method.');
      } else if (resetError.code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else {
        setError(resetError.message || 'Unable to send reset email right now.');
      }
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

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

  const updateRobotLook = (clientX, clientY) => {
    if (!robotAreaRef.current) {
      return;
    }

    const rect = robotAreaRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawX = (clientX - centerX) / (rect.width / 2);
    const rawY = (clientY - centerY) / (rect.height / 2);
    const normalizedX = Math.max(-1, Math.min(1, rawX));
    const normalizedY = Math.max(-1, Math.min(1, rawY));

    setRobotLook({
      x: normalizedX * 8,
      y: normalizedY * 6,
      tilt: normalizedX * 14,
      nod: normalizedY * 10,
    });
  };

  const handleRobotPointerMove = (event) => {
    updateRobotLook(event.clientX, event.clientY);
  };

  const handleRobotTouchMove = (event) => {
    const touch = event.touches?.[0];
    if (!touch) {
      return;
    }
    updateRobotLook(touch.clientX, touch.clientY);
  };

  const handleRobotLeave = () => {
    setRobotLook({ x: 0, y: 0, tilt: 0, nod: 0 });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-14 md:py-18 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-background via-background to-black/70" />
      <motion.div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-170 h-170 rounded-full bg-primary/12 blur-3xl"
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-44 -left-14 w-130 h-130 rounded-full bg-secondary/12 blur-3xl"
        animate={{ scale: [1.06, 1, 1.06], opacity: [0.4, 0.22, 0.4] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-8 -right-16 w-110 h-110 rounded-full border border-white/10"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      />
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,rgba(82,39,255,0.2),transparent_35%),radial-gradient(circle_at_75%_70%,rgba(0,242,255,0.14),transparent_30%)]" />

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

      <div className="absolute inset-0 -z-10 pointer-events-none opacity-30 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-5 md:gap-6 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-2xl border border-white/15 bg-background/55 backdrop-blur-xl p-6 md:p-8"
        >
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(255,0,255,0.2),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(0,242,255,0.18),transparent_30%)]" />

          <div className="relative h-full flex items-center justify-center">
            <div
              ref={robotAreaRef}
              onPointerMove={handleRobotPointerMove}
              onTouchMove={handleRobotTouchMove}
              onMouseLeave={handleRobotLeave}
              onPointerLeave={handleRobotLeave}
              onTouchEnd={handleRobotLeave}
              className="relative rounded-xl border border-white/15 bg-black/35 p-5 min-h-[280px] w-full flex items-center justify-center touch-none"
            >
              <motion.div
                animate={{ y: [0, -5, 0], opacity: [0.9, 1, 0.9] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-52 h-44"
              >
                <div className="absolute -inset-8 rounded-full bg-primary/20 blur-2xl" />

                <motion.div
                  className="absolute left-1/2 top-5 -translate-x-1/2 w-24 h-6 rounded-full border-2 border-white/70 bg-black/45"
                  animate={{ x: robotLook.x * 0.18 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                >
                  <div className="absolute left-1/2 -top-5 -translate-x-1/2 w-3 h-5 rounded-t-full bg-white/75" />
                </motion.div>

                <motion.div
                  className="absolute left-1/2 top-12 -translate-x-1/2 w-34 h-24 rounded-3xl border-[6px] border-white/80 bg-black/45"
                  animate={{ x: robotLook.x, y: robotLook.y * 0.4, rotate: robotLook.tilt, rotateX: -robotLook.nod }}
                  transition={{ type: 'spring', stiffness: 190, damping: 14 }}
                >
                  <motion.span
                    className="absolute left-7 top-8 w-3 h-7 rounded-full bg-white/80"
                    animate={{ x: robotLook.x * 0.24, y: robotLook.y * 0.18 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  />
                  <motion.span
                    className="absolute right-7 top-8 w-3 h-7 rounded-full bg-white/80"
                    animate={{ x: robotLook.x * 0.24, y: robotLook.y * 0.18 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  />
                </motion.div>

                <motion.div
                  className="absolute left-1/2 bottom-5 -translate-x-1/2 w-24 h-9 rounded-2xl border-2 border-white/60 bg-black/35"
                  animate={{ x: robotLook.x * 0.08, y: robotLook.y * 0.04, rotate: robotLook.tilt * 0.12 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                />
              </motion.div>

              <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-[10px] tracking-wide text-primary/90">
                <Shield size={12} />
                SECURE NODE
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="rounded-2xl border border-primary/30 bg-background/65 backdrop-blur-xl p-6 md:p-8"
        >
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-primary mb-2">Sign In</h1>
          <p className="text-white/70 text-sm mb-6">Use your Archon account credentials.</p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/35 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-white/20 bg-black/35 px-4 py-2.5 text-white placeholder:text-white/40 focus:outline-none focus:border-primary"
              required
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {info && <p className="text-emerald-400 text-sm">{info}</p>}

            {showForgotPassword && (
              <button
                type="button"
                onClick={handleForgotPassword}
                disabled={isSendingReset || loading}
                className="text-xs text-primary underline underline-offset-4 disabled:opacity-70"
              >
                {isSendingReset ? 'Sending reset link...' : 'Forgot Password?'}
              </button>
            )}

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
        </motion.div>
      </div>
    </section>
  );
};

export default SignInPage;
