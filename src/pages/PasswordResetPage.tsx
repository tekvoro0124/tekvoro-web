import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

export default function PasswordResetPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setStatus('success');
        setMessage('Password reset link sent to your email. Please check your inbox.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to send reset link. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <SEO 
        title="Reset Password - Tekvoro"
        description="Reset your Tekvoro account password"
        canonical="https://tekvoro.com/password-reset"
      />
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-20"
      >
        <div className="max-w-md w-full">
          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-gray-800 rounded-lg p-8 shadow-xl"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4">
                <Mail className="w-8 h-8 text-yellow-400" />
              </div>
              <h1 className="text-2xl font-bold">Reset Password</h1>
              <p className="text-gray-400 mt-2">Enter your email to receive a password reset link</p>
            </div>

            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-900/30 border border-green-700 rounded-lg p-4 mb-6 flex items-gap-3"
              >
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-300 font-semibold">Check Your Email</p>
                  <p className="text-green-200 text-sm">{message}</p>
                </div>
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-900/30 border border-red-700 rounded-lg p-4 mb-6 flex items-gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-300 font-semibold">Error</p>
                  <p className="text-red-200 text-sm">{message}</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={status === 'loading'}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:border-yellow-400 focus:outline-none disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading' || status === 'success'}
                className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black font-semibold py-3 rounded-lg transition"
              >
                {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="text-center text-gray-400 text-sm mt-6">
              Remember your password? <a href="/admin/login" className="text-yellow-400 hover:underline">Login here</a>
            </p>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
