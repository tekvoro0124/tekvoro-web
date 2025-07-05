import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Linkedin, 
  Twitter, 
  Mail, 
  Globe, 
  Award,
  Users,
  Target,
  Zap,
  Heart,
  Star,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    role: 'CEO & Co-Founder',
    department: 'Leadership',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    bio: 'Former AI researcher at Google, leading Tekvoro\'s vision for democratizing AI technology.',
    expertise: ['AI Strategy', 'Business Development', 'Innovation'],
    linkedin: '#',
    twitter: '#',
    email: 'sarah@tekvoro.com',
    featured: true
  },
  {
    id: 2,
    name: 'Marcus Rodriguez',
    role: 'CTO & Co-Founder',
    department: 'Technology',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    bio: 'Ex-Microsoft architect with 15+ years in cloud computing and AI systems.',
    expertise: ['Cloud Architecture', 'AI Systems', 'Technical Strategy'],
    linkedin: '#',
    twitter: '#',
    email: 'marcus@tekvoro.com',
    featured: true
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'VP of Engineering',
    department: 'Engineering',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    bio: 'Leading our engineering teams to build scalable, innovative solutions.',
    expertise: ['Software Engineering', 'Team Leadership', 'Product Development'],
    linkedin: '#',
    twitter: '#',
    email: 'priya@tekvoro.com',
    featured: false
  },
  {
    id: 4,
    name: 'Alex Thompson',
    role: 'Head of AI Research',
    department: 'AI Research',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    bio: 'PhD in Machine Learning, driving our cutting-edge AI research initiatives.',
    expertise: ['Machine Learning', 'Research', 'AI Ethics'],
    linkedin: '#',
    twitter: '#',
    email: 'alex@tekvoro.com',
    featured: false
  },
  {
    id: 5,
    name: 'Elena Petrov',
    role: 'VP of Product',
    department: 'Product',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    bio: 'Product visionary with experience at top tech companies.',
    expertise: ['Product Strategy', 'User Experience', 'Market Analysis'],
    linkedin: '#',
    twitter: '#',
    email: 'elena@tekvoro.com',
    featured: false
  },
  {
    id: 6,
    name: 'David Kim',
    role: 'Head of Security',
    department: 'Security',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    bio: 'Cybersecurity expert ensuring our solutions are secure by design.',
    expertise: ['Cybersecurity', 'Compliance', 'Risk Management'],
    linkedin: '#',
    twitter: '#',
    email: 'david@tekvoro.com',
    featured: false
  }
];

const departments = ['All', 'Leadership', 'Technology', 'Engineering', 'AI Research', 'Product', 'Security'];

const stats = [
  { number: '50+', label: 'Team Members', icon: <Users className="w-6 h-6" /> },
  { number: '15+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
  { number: '25+', label: 'Countries', icon: <Globe className="w-6 h-6" /> },
  { number: '100+', label: 'AI Projects', icon: <Target className="w-6 h-6" /> }
];

const MeetTheTeamPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);

  const filteredMembers = selectedDepartment === 'All' 
    ? teamMembers 
    : teamMembers.filter(member => member.department === selectedDepartment);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Meet The Team | Tekvoro Technologies"
        description="Meet our talented team of professionals who are passionate about technology and innovation. Learn about our experts and their expertise in delivering exceptional solutions."
        keywords="meet the team, our team, team members, professionals, experts, staff, team profiles"
        ogImage="/images/meet-the-team-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Meet The Team",
          "description": "Meet our talented team of professionals passionate about technology",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mb-8 flex flex-wrap justify-center gap-3"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                AI 2025 Team
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-blue-400 text-sm font-semibold">
                <Users className="w-4 h-4" />
                Global Experts
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tight mb-8"
            >
              <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                Meet the
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
              Meet the brilliant minds behind Tekvoro's AI revolution. Our diverse team of experts is passionate about transforming businesses through innovative technology.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="#team"
                className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Meet Our Team
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
              
              <motion.a
                href="/learn-more"
                className="group px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-b from-black to-neutral-950">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group text-center"
              >
                <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-xl bg-yellow-400/20 text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Leadership</span> Team
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Meet the visionaries driving our AI revolution
            </p>
          </motion.div>

          {/* Department Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {departments.map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  selectedDepartment === dept
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg'
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20'
                }`}
              >
                {dept}
              </button>
            ))}
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500 overflow-hidden">
                  {member.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="relative mb-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-24 h-24 rounded-2xl object-cover mx-auto border-2 border-yellow-400/30 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-black" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-yellow-400 font-semibold mb-1">{member.role}</p>
                    <p className="text-gray-400 text-sm">{member.department}</p>
                  </div>

                  <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                    {member.bio}
                  </p>

                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-medium backdrop-blur-md"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <a
                      href={member.linkedin}
                      className="p-2 rounded-lg bg-white/10 text-white hover:bg-blue-500 transition-all duration-300"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                    <a
                      href={member.twitter}
                      className="p-2 rounded-lg bg-white/10 text-white hover:bg-blue-400 transition-all duration-300"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                    <a
                      href={`mailto:${member.email}`}
                      className="p-2 rounded-lg bg-white/10 text-white hover:bg-yellow-500 transition-all duration-300"
                    >
                      <Mail className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-gradient-to-b from-black to-neutral-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Culture</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              We foster a culture of innovation, collaboration, and continuous learning
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="p-8 rounded-3xl bg-gradient-to-br from-yellow-400/10 to-orange-500/10 backdrop-blur-xl border border-yellow-400/20">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
                <p className="text-gray-300">
                  We encourage creative thinking and push the boundaries of what's possible with AI technology.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-400/10 to-cyan-500/10 backdrop-blur-xl border border-blue-400/20">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Collaboration</h3>
                <p className="text-gray-300">
                  We believe in the power of diverse teams working together to solve complex challenges.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="p-8 rounded-3xl bg-gradient-to-br from-red-400/10 to-pink-500/10 backdrop-blur-xl border border-red-400/20">
                <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Heart className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Passion</h3>
                <p className="text-gray-300">
                  Our team is passionate about making a positive impact through technology and innovation.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-black via-yellow-900/20 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Join Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Ready to be part of the AI revolution? We're always looking for talented individuals to join our mission.
          </p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/careers"
              className="group px-10 py-4 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                View Careers
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.a>
            <motion.a
              href="/learn-more"
              className="group px-10 py-4 rounded-2xl border-2 border-white/30 text-white font-bold text-lg backdrop-blur-md hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default MeetTheTeamPage; 