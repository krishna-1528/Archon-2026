import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase';

const generateArchonId = () => {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `AR26-${digits}`;
};

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
    <section className="relative min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/5 backdrop-blur-md p-6 md:p-8">
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
