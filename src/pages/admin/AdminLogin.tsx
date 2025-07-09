import { motion } from 'framer-motion';
import { LogIn, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    console.log('AdminLogin - Attempting login with:', { email, password });
    
    const success = await login(email, password);
    setLoading(false);
    
    if (success) {
      console.log('AdminLogin - Login successful, navigating to admin');
      navigate('/admin');
    } else {
      console.log('AdminLogin - Login failed');
      setError('Invalid email or password. Please check your credentials.');
    }
  };

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl mt-24 mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Admin Login</h2>
        <form className="space-y-6" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-xl bg-white/10 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
            required
          />
                  {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <div className="text-blue-400 text-sm text-center bg-blue-400/10 p-3 rounded-lg border border-blue-400/20">
          <strong>Secure Admin Login:</strong><br />
          Use your configured admin credentials<br />
          Contact system administrator for access
        </div>
          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
            disabled={loading}
          >
            <LogIn className="w-5 h-5" /> {loading ? 'Logging in...' : 'Login'}
          </button>
          
          <div className="text-center">
            <Link
              to="/admin/password-manager"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm transition-colors"
            >
              <Lock className="w-4 h-4" />
              Set Custom Password
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}