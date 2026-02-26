import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy - Tekvoro"
        description="Our privacy policy explains how we collect, use, and protect your data."
        canonical="https://tekvoro.com/privacy-policy"
      />
      <Navbar />
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-gray-900 text-white py-20"
      >
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-12">Privacy Policy</h1>
          
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                At Tekvoro ("we", "us", "our"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect information that you voluntarily provide, including:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Contact form data (name, email, company, phone)</li>
                <li>Demo booking information</li>
                <li>Newsletter subscriptions</li>
                <li>Support ticket submissions</li>
                <li>Account registration data (if applicable)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">Your information is used for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Responding to inquiries and providing services</li>
                <li>Sending newsletters and marketing communications</li>
                <li>Improving our website and services</li>
                <li>Complying with legal obligations</li>
                <li>Analytics and tracking user behavior</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal data, including SSL encryption, secure database access, and regular security audits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">5. Third-Party Services</h2>
              <p>
                We use SendGrid for email delivery and MongoDB Atlas for data storage. These providers have their own privacy policies that may apply to your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">6. Cookies</h2>
              <p>
                Our website uses cookies to enhance your experience. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Request data correction</li>
                <li>Request data deletion</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-white mb-4">8. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at: <strong>privacy@tekvoro.com</strong>
              </p>
            </section>

            <section className="bg-gray-800 p-6 rounded-lg">
              <p className="text-sm text-gray-400">
                <strong>Last Updated:</strong> February 26, 2026<br/>
                <strong>Effective Date:</strong> February 26, 2026
              </p>
            </section>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
}
