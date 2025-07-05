import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { Sparkles, ArrowRight, MapPin, Clock, DollarSign, Users, Calendar, Star, Award, CheckCircle } from 'lucide-react';

const positions = [
  {
    title: 'Senior AI Engineer',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '$80K - $120K',
    department: 'Engineering',
    description: 'Join our AI team to build cutting-edge machine learning solutions.'
  },
  {
    title: 'Full Stack Developer',
    location: 'Hyderabad, India',
    type: 'Full-time',
    salary: '$60K - $90K',
    department: 'Engineering',
    description: 'Develop scalable web applications using modern technologies.'
  }
];

const CareersPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <SEO
        title="Careers at Tekvoro Technologies - Join Our Team"
        description="Join Tekvoro Technologies and be part of a team that's shaping the future of AI and digital transformation. Explore career opportunities in technology, innovation, and growth."
        keywords="careers, jobs, employment, AI jobs, technology careers, software development jobs, Hyderabad tech jobs, digital transformation careers"
        ogImage="/images/careers-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "JobPosting",
          "title": "Careers at Tekvoro Technologies",
          "description": "Join our team of innovators and technology experts",
          "hiringOrganization": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          },
          "jobLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Hyderabad",
              "addressCountry": "India"
            }
          }
        }}
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
                Join Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Team
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              Build the future with us. Explore exciting career opportunities at Tekvoro.
            </motion.p>

            <motion.a
              href="#positions"
              className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                View Open Positions
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <section id="positions" className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-12 text-center"
          >
            Open <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Positions</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {positions.map((position, idx) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <h3 className="text-2xl font-bold text-white mb-4">{position.title}</h3>
                  <p className="text-gray-300 mb-6">{position.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{position.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{position.type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-sm">{position.salary}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{position.department}</span>
                    </div>
                  </div>

                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
                  >
                    Apply Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CareersPage;
