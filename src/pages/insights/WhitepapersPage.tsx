import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, FileText, Calendar, Eye } from 'lucide-react';

const whitepapers = [
  {
    title: 'AI in Enterprise: A Comprehensive Guide',
    description: 'Explore how artificial intelligence is transforming enterprise operations and decision-making processes.',
    author: 'Dr. Sarah Johnson',
    publishDate: '2024-12-15',
    downloads: 1250,
    category: 'AI & ML'
  },
  {
    title: 'Cloud Computing Security Best Practices',
    description: 'Essential security measures and best practices for cloud-based applications and infrastructure.',
    author: 'Michael Chen',
    publishDate: '2024-12-10',
    downloads: 890,
    category: 'Cybersecurity'
  }
];

export default function WhitepapersPage() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
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
                White
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Papers
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
            >
              In-depth research and insights on the latest technology trends and innovations.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-neutral-950 to-black">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {whitepapers.map((paper, idx) => (
              <motion.div
                key={paper.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-yellow-400/20 text-yellow-400">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{paper.title}</h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">{paper.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {paper.publishDate}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {paper.downloads} downloads
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-yellow-400 font-semibold">{paper.category}</span>
                        <a
                          href="#"
                          className="flex items-center gap-2 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors"
                        >
                          Download
                          <Download className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
