import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube, Globe, ArrowRight, Sparkles, Code, Cloud, Smartphone, MonitorSmartphone, PenTool, BookOpen, FileText, CalendarDays, Award } from 'lucide-react';
import Logo from './Logo';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { supabase } from '../../utils/supabaseClient';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Newsletter subscribe state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState('');
  const [newsletterLoading, setNewsletterLoading] = useState(false);

  async function handleNewsletterSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setNewsletterStatus('');
    setNewsletterLoading(true);
    if (!newsletterEmail) return;
    
    try {
      const functionUrl = import.meta.env.DEV 
        ? 'http://localhost:8888/.netlify/functions/subscribe'
        : 'https://tekvoro.com/.netlify/functions/subscribe';
      
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newsletterEmail,
          name: 'Newsletter Subscriber',
          company: '',
          interests: [],
          selectedPlan: 'Free'
        })
      });

      const result = await response.json();

      if (result.success) {
        setNewsletterStatus('Subscribed successfully!');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus(result.error || 'Subscription failed. Please try again later.');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setNewsletterStatus('Subscription failed. Please try again later.');
    } finally {
      setNewsletterLoading(false);
    }
  }

  return (
    <footer className="relative bg-gradient-to-br from-black via-neutral-950 to-black text-white pt-20 pb-10 overflow-hidden border-t border-white/10">
      {/* Enhanced animated background gradients */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-yellow-500/20 via-red-500/10 to-black/0 rounded-full blur-3xl opacity-30 animate-pulse"
        animate={{ scale: [1, 1.1, 1], rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 12 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-blue-500/20 via-purple-500/10 to-black/0 rounded-full blur-2xl opacity-20 animate-pulse"
        animate={{ scale: [1, 1.05, 1], rotate: [360, 180, 0] }}
        transition={{ repeat: Infinity, duration: 15 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-full blur-2xl opacity-20 animate-pulse"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 8 }}
      />
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Logo />
            </motion.div>
            <motion.p 
              className="mb-4 text-gray-300 text-lg font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Leading IT solutions in Hyderabad, delivering pure innovation for a digital future.
            </motion.p>
            <motion.div 
              className="flex flex-col space-y-3 text-gray-400 text-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center group">
                <div className="p-2 rounded-lg bg-yellow-400/10 mr-3 group-hover:bg-yellow-400/20 transition-colors">
                  <MapPin className="w-4 h-4 text-yellow-400" />
                </div>
                <span className="group-hover:text-white transition-colors">5-24-190, NTR Nagar, Gajularamaram, Hyderabad, Telangana – 500055</span>
              </div>
              <div className="flex items-center group">
                <div className="p-2 rounded-lg bg-blue-400/10 mr-3 group-hover:bg-blue-400/20 transition-colors">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
                <a href="mailto:info@tekvoro.com" className="group-hover:text-white transition-colors">info@tekvoro.com</a>
              </div>
              <div className="flex items-center group">
                <div className="p-2 rounded-lg bg-green-400/10 mr-3 group-hover:bg-green-400/20 transition-colors">
                  <Phone className="w-4 h-4 text-green-400" />
                </div>
                <a href="tel:+919121331813" className="group-hover:text-white transition-colors">+91 9121331813</a>
              </div>
            </motion.div>
            <motion.div 
              className="flex gap-4 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
            </motion.div>
          </div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Company
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/about', label: 'About Us' },
                { to: '/about/leadership', label: 'Leadership' },
                { to: '/about/culture', label: 'Culture' },
                { to: '/careers', label: 'Careers' },
                { to: '/contact', label: 'Contact' },
                { to: '/admin/login', label: 'Admin (Demo Login)' },
              ].map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Link 
                    to={link.to} 
                    className={`text-gray-300 ${link.label.includes('Admin') ? 'hover:text-yellow-400 font-semibold' : 'hover:text-yellow-400'} transition-all duration-300 flex items-center gap-2 group`}
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link.label}
                    {link.label.includes('Admin') && (
                      <span className="block text-xs text-blue-300 mt-1 ml-6 bg-white/5 px-2 py-1 rounded-md border border-blue-400/20 w-fit">Secure admin access - contact administrator</span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Services
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/industries/ai-ml', label: 'AI Solutions' },
                { to: '/services/web-development', label: 'Web Development' },
                { to: '/services/mobile-apps', label: 'Mobile Apps' },
                { to: '/services/cloud-solutions', label: 'Cloud Services' },
                { to: '/services/ui-ux-design', label: 'UI/UX Design' },
              ].map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 6 }}
                  className="flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3 h-3 text-blue-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <Link to={link.to} className="text-gray-300 hover:text-blue-400 transition-all duration-300 flex items-center gap-2">{link.label}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-bold mb-6 text-white tracking-wide flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-green-400" />
              Resources
            </h3>
            <ul className="space-y-4">
              {[
                { to: '/blog', label: 'Blog & Insights' },
                { to: '/insights/case-studies', label: 'Case Studies' },
                { to: '/insights/whitepapers', label: 'Whitepapers' },
                { to: '/insights/events', label: 'Events' },
                { to: '/client-portal', label: 'Client Portal' },
                { to: '/support-center', label: 'Support Center' },
                { to: '/subscribe', label: 'Newsletter' },
                { to: '/marketing', label: 'Marketing Campaigns', internal: true },
              ].map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, x: 6 }}
                  className="flex items-center gap-2 group"
                >
                  <ArrowRight className="w-3 h-3 text-green-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  <Link 
                    to={link.to} 
                    className={`text-gray-300 hover:text-green-400 transition-all duration-300 flex items-center gap-2`}
                  >
                    {link.label}
                    {(link as any).internal && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">Internal</span>
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Enhanced Newsletter Section */}
        <motion.div 
          className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-lg w-full">
            <h3 className="text-3xl font-bold mb-3 text-white tracking-wide bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Stay Updated
            </h3>
            <p className="text-gray-400 mb-6 text-lg">Subscribe to our newsletter for the latest insights and updates.</p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleNewsletterSubscribe}>
              <input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={e => setNewsletterEmail(e.target.value)}
                className="px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400/50 bg-white/5 backdrop-blur-md text-white flex-grow border border-white/10 placeholder-gray-400 hover:border-white/20 transition-all duration-300"
                required
              />
              <motion.button 
                type="submit" 
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 whitespace-nowrap"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={newsletterLoading}
              >
                {newsletterLoading ? 'Subscribing...' : 'Subscribe'}
              </motion.button>
            </form>
            {newsletterStatus && (
              <div className={`mt-2 text-sm ${newsletterStatus.includes('success') ? 'text-green-400' : 'text-red-400'}`}>{newsletterStatus}</div>
            )}
          </div>
          <motion.div 
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="text-gray-400 text-sm mb-4 font-medium">Follow us for more updates</span>
            <div className="flex gap-3">
              {[
                { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-400' },
                { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-cyan-400' },
                { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-400' },
                { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-500' },
                { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:text-red-400' },
                { icon: Globe, href: '#', label: 'Website', color: 'hover:text-yellow-400' }
              ].map((social, idx) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`p-3 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300 ${social.color}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-white/10 mt-12 pt-8 text-center text-gray-400 text-sm tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <p>© {currentYear} Tekvoro Technologies. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;