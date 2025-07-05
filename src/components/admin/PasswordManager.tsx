import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PasswordManager() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const { setCustomPassword, getCustomPassword } = useAuth();

  const handleSetCustomPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // Validate current password (demo123 or existing custom password)
      const customPassword = getCustomPassword();
      const isValidCurrentPassword = currentPassword === 'demo123' || currentPassword === customPassword;

      if (!isValidCurrentPassword) {
        setMessage({ type: 'error', text: 'Current password is incorrect' });
        return;
      }

      // Validate new password
      if (newPassword.length < 6) {
        setMessage({ type: 'error', text: 'New password must be at least 6 characters long' });
        return;
      }

      if (newPassword !== confirmPassword) {
        setMessage({ type: 'error', text: 'New passwords do not match' });
        return;
      }

      // Set the custom password
      setCustomPassword(newPassword);
      setMessage({ type: 'success', text: 'Custom password set successfully! You can now use this password to login.' });
      
      // Clear form
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to set custom password. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleResetToDefault = () => {
    localStorage.removeItem('tekvoro_custom_password');
    setMessage({ type: 'success', text: 'Password reset to default (demo123)' });
  };

  const currentCustomPassword = getCustomPassword();

  return (
    <div className="bg-black min-h-screen flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        <div className="text-center mb-8">
          <Lock className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Password Manager</h2>
          <p className="text-gray-400 text-sm">Set a custom password for admin login</p>
        </div>

        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-xl mb-6 flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <span className="text-sm">{message.text}</span>
          </motion.div>
        )}

        <form onSubmit={handleSetCustomPassword} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? 'text' : 'password'}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors pr-12"
                placeholder="Enter current password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Use: demo123 or your current custom password
            </p>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              New Custom Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors pr-12"
                placeholder="Enter new password (min 6 characters)"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors pr-12"
                placeholder="Confirm new password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Setting Password...' : 'Set Custom Password'}
          </button>
        </form>

        {/* Current Status */}
        <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
          <h3 className="text-sm font-medium text-white mb-2">Current Status</h3>
          <div className="text-sm text-gray-400">
            <p>Default Password: <span className="text-yellow-400">demo123</span></p>
            {currentCustomPassword ? (
              <p>Custom Password: <span className="text-green-400">Set</span></p>
            ) : (
              <p>Custom Password: <span className="text-gray-500">Not set</span></p>
            )}
          </div>
        </div>

        {/* Reset Button */}
        {currentCustomPassword && (
          <button
            onClick={handleResetToDefault}
            className="w-full mt-4 px-6 py-3 rounded-xl border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-all duration-300"
          >
            Reset to Default Password
          </button>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
          <h3 className="text-sm font-medium text-yellow-400 mb-2">How it works:</h3>
          <ul className="text-xs text-gray-400 space-y-1">
            <li>• Set a custom password to replace the default "demo123"</li>
            <li>• You can use either the default or custom password to login</li>
            <li>• Custom passwords are stored locally in your browser</li>
            <li>• Reset to default anytime to go back to "demo123"</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
} 