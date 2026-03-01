import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';

export default function UnsubscribePage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing unsubscribe...');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleUnsubscribe = async () => {
      const token = searchParams.get('token');
      const emailParam = searchParams.get('email');

      if (!token && !emailParam) {
        setStatus('error');
        setMessage('Invalid unsubscribe link. Please contact support.');
        return;
      }

      try {
        const response = await fetch('/api/subscription/unsubscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            token,
            email: emailParam 
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('You have been successfully unsubscribed from our mailing list.');
          if (emailParam) setEmail(emailParam);
        } else {
          setStatus('error');
          setMessage(data.error || 'Failed to unsubscribe. Please try again.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred. Please try again later or contact support.');
      }
    };

    handleUnsubscribe();
  }, [searchParams]);

  return (
    <>
      <SEO 
        title="Unsubscribe - Tekvoro"
        description="Manage your email subscriptions"
        canonical="https://tekvoro.com/unsubscribe"
        noIndex={true}
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
            className="bg-gray-800 rounded-lg p-8 shadow-xl text-center"
          >
            {status === 'loading' && (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/20 rounded-full mb-4"
                >
                  <Loader className="w-8 h-8 text-yellow-400" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">Unsubscribing...</h1>
              </>
            )}

            {status === 'success' && (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-4"
                >
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">Unsubscribed</h1>
                <p className="text-gray-400 mb-6">{message}</p>
                {email && (
                  <p className="text-gray-500 text-sm">
                    Email: <strong>{email}</strong>
                  </p>
                )}
              </>
            )}

            {status === 'error' && (
              <>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-red-500/20 rounded-full mb-4"
                >
                  <AlertCircle className="w-8 h-8 text-red-400" />
                </motion.div>
                <h1 className="text-2xl font-bold mb-2">Error</h1>
                <p className="text-gray-400 mb-6">{message}</p>
                <p className="text-gray-500 text-sm">
                  Please contact us at <strong>support@tekvoro.com</strong> for assistance.
                </p>
              </>
            )}

            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm">
                You will no longer receive promotional emails from Tekvoro. <br/>
                <a href="/contact" className="text-yellow-400 hover:underline">Contact us</a> if you have questions.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
