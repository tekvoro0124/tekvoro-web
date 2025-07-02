import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';

export default function EmailCampaignsAdmin() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-xl w-full bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-10 shadow-2xl border border-yellow-400/20 backdrop-blur-xl text-center"
        >
          <h1 className="text-3xl font-bold text-white mb-4">Email Campaigns</h1>
          <p className="text-lg text-gray-300 mb-6">This is a placeholder for future email campaign management features. Here you will be able to create, send, and track email campaigns.</p>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
} 