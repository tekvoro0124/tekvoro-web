import { useState } from 'react';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export default function ClientLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Simulate login
    setTimeout(() => {
      if (!email || !password) {
        setError('Please enter both email and password.');
      } else {
        setError('');
        // Redirect or show success (not implemented)
      }
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-black via-neutral-900 to-black text-white">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-16">
        <div className="w-full max-w-md bg-white/10 rounded-2xl shadow-2xl p-8 border border-white/10 backdrop-blur-xl">
          <div className="flex flex-col items-center mb-8">
            <Lock className="w-12 h-12 text-yellow-400 mb-2" />
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Client Login</h1>
            <p className="text-gray-300 text-center">Access your client portal to manage your projects, documents, and more.</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
                  placeholder="you@email.com"
                  autoComplete="email"
                  required
                />
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-400" />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/60 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-gray-400"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-yellow-400"
                  onClick={() => setShowPassword(v => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            {error && <div className="text-red-400 text-sm text-center">{error}</div>}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 mt-2 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
          <div className="mt-6 text-center text-gray-400 text-sm">
            <span>Don&apos;t have an account? </span>
            <Link to="/subscribe" className="text-yellow-400 hover:underline">Request Access</Link>
          </div>
          <div className="mt-4 text-center">
            <Link to="/client-portal" className="text-blue-400 hover:underline text-sm">Go to Client Portal</Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 