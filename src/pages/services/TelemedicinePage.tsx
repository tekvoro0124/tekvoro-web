import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Video, PhoneCall, UserCheck, HeartPulse, Globe2 } from 'lucide-react';

const features = [
  {
    icon: <Video className="w-8 h-8 text-blue-500 mb-4" />,
    title: 'HD Video Consultations',
    description: 'Connect with healthcare professionals from anywhere, anytime, via secure video calls.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <PhoneCall className="w-8 h-8 text-green-500 mb-4" />,
    title: '24/7 Access',
    description: 'Get medical advice and support around the clock, no matter your location.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <UserCheck className="w-8 h-8 text-blue-500 mb-4" />,
    title: 'Verified Doctors',
    description: 'Consult with certified, experienced healthcare providers you can trust.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <HeartPulse className="w-8 h-8 text-green-500 mb-4" />,
    title: 'Remote Monitoring',
    description: 'Track your health and share real-time data with your care team for better outcomes.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  },
];

const testimonials = [
  {
    quote: 'Telemedicine made it easy to get expert advice without leaving home. Fast, secure, and caring! Highly recommend.',
    name: 'Amit Patel',
    role: 'Patient',
    image: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    quote: 'As a doctor, I can reach more patients and provide better follow-up care. The platform is intuitive and reliable.',
    name: 'Dr. Priya Rao',
    role: 'General Physician',
    image: 'https://randomuser.me/api/portraits/women/55.jpg',
  },
];

const TelemedicinePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Telemedicine Solutions | Tekvoro Technologies"
        description="Revolutionize healthcare delivery with secure, scalable telemedicine platforms. Connect patients with healthcare providers through advanced video conferencing and remote monitoring."
        keywords="telemedicine, telehealth, remote healthcare, video consultations, healthcare technology, medical software, patient care, digital health"
        ogImage="/images/telemedicine-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Telemedicine Solutions",
          "description": "Revolutionize healthcare delivery with secure, scalable telemedicine platforms",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          },
          "serviceType": "Telemedicine Platform Development"
        }}
      />
      <Navbar />
      {/* Immersive Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden py-24">
        <div className="container-custom flex flex-col md:flex-row items-center gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1"
          >
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-r from-white via-blue-300 to-green-500 bg-clip-text text-transparent drop-shadow-lg">
              Telemedicine
            </h1>
            <p className="text-2xl md:text-3xl text-gray-200 max-w-2xl mb-10 font-light">
              Access quality healthcare from anywhere. Secure, convenient, and always available—your health, your way.
            </p>
            <motion.a
              href="#features"
              className="inline-block px-12 py-5 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-xl mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              Explore Features
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 relative"
          >
            <img
              src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=900&q=80"
              alt="Telemedicine Banner"
              className="rounded-2xl shadow-2xl w-full h-96 object-cover border-4 border-white/10"
            />
            <motion.div
              className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-900/40 via-green-900/40 to-black/0 rounded-full blur-2xl opacity-50 animate-pulse"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 7 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="py-24 bg-neutral-950">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 hover:shadow-lg hover:scale-105 transition-all"
            >
              {feature.icon}
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-32 object-cover rounded-lg mb-4 border border-white/10 shadow"
                loading="lazy"
              />
              <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                {feature.title}
              </h3>
              <p className="text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-black/90">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              What Our Users Say
            </h2>
            <p className="text-lg text-gray-400">
              Real stories from patients and doctors using Tekvoro Telemedicine.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 max-w-xs hover:shadow-lg hover:scale-105 transition-all"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-16 h-16 rounded-full mb-4 border-2 border-blue-600 shadow"
                />
                <p className="text-gray-200 italic mb-4">“{t.quote}”</p>
                <div className="font-bold text-white">{t.name}</div>
                <div className="text-sm text-gray-400">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-blue-900 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready for a Virtual Visit?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Start your telemedicine journey with Tekvoro. Book a consultation or talk to our experts.
          </p>
          <a href="#contact" className="inline-block px-10 py-4 rounded-lg bg-blue-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-lg">
            Book a Consultation
          </a>
        </motion.div>
        {/* Animated background shapes */}
        <motion.div
          className="absolute left-0 top-0 w-40 h-40 bg-gradient-to-br from-blue-900/40 via-green-900/40 to-black/0 rounded-full blur-2xl opacity-40 animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-60 h-60 bg-gradient-to-tr from-white/10 via-blue-700/20 to-black/0 rounded-full blur-2xl opacity-30 animate-pulse"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 9 }}
        />
      </section>

      <Footer />
    </div>
  );
};

export default TelemedicinePage; 