import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import emailService from '../../services/emailService';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    projectType: '',
    budget: '',
    timeline: '',
    describeProject: '',
    howFoundUs: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Lead scoring function based on automation master
  const calculateLeadScore = (data: typeof formData): { score: number; category: string; priority: 'HOT' | 'WARM' | 'COLD' | 'UNFIT' } => {
    let score = 0;

    // Budget scoring
    switch (data.budget) {
      case '₹20L+': score += 40; break;
      case '₹8L - ₹20L': score += 30; break;
      case '₹3L - ₹8L': score += 20; break;
      case 'Under ₹3L': score += 5; break;
      case 'International ($10K+)': score += 35; break;
    }

    // Timeline scoring
    switch (data.timeline) {
      case 'ASAP (< 1 month)': score += 25; break;
      case '1-3 months': score += 20; break;
      case '3-6 months': score += 10; break;
      case 'Flexible': score += 5; break;
    }

    // Source scoring
    switch (data.howFoundUs) {
      case 'Referral': score += 20; break;
      case 'Clutch': score += 15; break;
      case 'LinkedIn': score += 10; break;
      case 'Google': score += 8; break;
    }

    // Project type scoring
    switch (data.projectType) {
      case 'AI Marketplace Platform': score += 15; break;
      case 'AI Integration / Bot': score += 12; break;
      case 'Admin Dashboard': score += 8; break;
      case 'White-Label Platform': score += 10; break;
      case 'Mobile App': score += 8; break;
    }

    // Determine category
    let category = 'UNFIT';
    let priority: 'HOT' | 'WARM' | 'COLD' | 'UNFIT' = 'UNFIT';

    if (score >= 80) {
      category = 'HOT';
      priority = 'HOT';
    } else if (score >= 50) {
      category = 'WARM';
      priority = 'WARM';
    } else if (score >= 20) {
      category = 'COLD';
      priority = 'COLD';
    }

    return { score, category, priority };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Calculate lead score
      const leadScoring = calculateLeadScore(formData);

      // Prepare contact submission data
      const contactData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        projectType: formData.projectType,
        budget: formData.budget,
        timeline: formData.timeline,
        description: formData.describeProject,
        source: formData.howFoundUs,
        subject: formData.subject || 'Project Inquiry',
        message: formData.message,
        leadScore: leadScoring.score,
        leadCategory: leadScoring.category,
        leadPriority: leadScoring.priority,
        submittedAt: new Date().toISOString()
      };

      // Send to API (we'll create the endpoint)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          company: '',
          phone: '',
          projectType: '',
          budget: '',
          timeline: '',
          describeProject: '',
          howFoundUs: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Tekvoro Technologies - Get in Touch"
        description="Contact Tekvoro Technologies for AI solutions, digital transformation, and technology consulting. Located in Hyderabad, India. Call +91 9121331813 or email tekvoro@gmail.com"
        keywords="contact Tekvoro, AI consulting, digital transformation services, technology consulting Hyderabad, IT solutions contact, AI company contact"
        canonical="https://www.tekvoro.com/contact"
      />
      <Navbar />
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Get In
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Touch
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Ready to transform your business? Let's discuss your project and explore how we can help.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                  <div className="p-3 rounded-xl bg-yellow-400/20 text-yellow-400">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Address</h3>
                    <p className="text-gray-300">5-24-190, NTR Nagar, Gajularamaram, Hyderabad, Telangana – 500055</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                  <div className="p-3 rounded-xl bg-blue-400/20 text-blue-400">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Phone</h3>
                    <p className="text-gray-300">+91 9121331813</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                  <div className="p-3 rounded-xl bg-green-400/20 text-green-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">Email</h3>
                    <p className="text-gray-300">tekvoro@gmail.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>
                
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 text-green-400 mb-4">
                      <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Message Sent Successfully!</h3>
                    <p className="text-gray-300 mb-6">Thank you for contacting us. We'll get back to you soon.</p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:shadow-yellow-500/25 transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      />
                    </div>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Business Email"
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Company Name"
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      >
                        <option value="">Select Project Type</option>
                        <option value="AI Marketplace Platform">AI Marketplace Platform</option>
                        <option value="AI Integration / Bot">AI Integration / Bot</option>
                        <option value="Admin Dashboard">Admin Dashboard</option>
                        <option value="White-Label Platform">White-Label Platform</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="Other">Other</option>
                      </select>

                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      >
                        <option value="">Select Budget Range</option>
                        <option value="Under ₹3L">Under ₹3L</option>
                        <option value="₹3L - ₹8L">₹3L - ₹8L</option>
                        <option value="₹8L - ₹20L">₹8L - ₹20L</option>
                        <option value="₹20L+">₹20L+</option>
                        <option value="International ($10K+)">International ($10K+)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        name="timeline"
                        value={formData.timeline}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      >
                        <option value="">Select Timeline</option>
                        <option value="ASAP (< 1 month)">ASAP ({"<"} 1 month)</option>
                        <option value="1-3 months">1-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="Flexible">Flexible</option>
                      </select>

                      <select
                        name="howFoundUs"
                        value={formData.howFoundUs}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors"
                      >
                        <option value="">How did you find us?</option>
                        <option value="Google">Google</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="Clutch">Clutch</option>
                        <option value="Referral">Referral</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <textarea
                      name="describeProject"
                      value={formData.describeProject}
                      onChange={handleChange}
                      placeholder="Describe your project in detail..."
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                    ></textarea>

                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Additional information or questions..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 transition-colors resize-none"
                    ></textarea>

                    {submitError && (
                      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {submitError}
                      </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
