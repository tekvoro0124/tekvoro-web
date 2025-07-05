import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import PageHeader from '../../components/layout/PageHeader';
import { Target, Eye, Lightbulb } from 'lucide-react';

const VisionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Our Vision | Tekvoro Technologies"
        description="Explore our vision for the future of technology and innovation. Learn about our mission to transform businesses and create lasting impact through cutting-edge solutions."
        keywords="company vision, mission vision, future vision, technology vision, innovation vision, strategic vision, business vision"
        ogImage="/images/vision-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Our Vision",
          "description": "Explore our vision for the future of technology and innovation",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <div className="animate-fade-in">
        <PageHeader
          title="Our Vision"
          description="Shaping the future of technology and innovation to create a better world for everyone."
          bgImage="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        <section className="section px-4">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Our Vision for the Future
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                To be the leading innovator in digital transformation, empowering businesses to thrive in an increasingly connected world through cutting-edge technology solutions that drive growth and create value.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <Eye className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
                  Future-Focused
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We anticipate tomorrow's challenges and build solutions that prepare our clients for the future of technology.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <Lightbulb className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
                  Innovation-Driven
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Innovation is at the heart of everything we do, pushing boundaries to create breakthrough solutions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <Target className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
                  Impact-Oriented
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We measure success by the positive impact our solutions have on businesses and communities.
                </p>
              </motion.div>
            </div>

            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-4">
                  Building Tomorrow, Today
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  Our vision extends beyond just providing technology solutions. We aim to be catalysts for positive change, helping organizations transform their operations, enhance their capabilities, and achieve sustainable growth in the digital age.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Through our commitment to excellence, innovation, and client success, we're not just adapting to the future – we're actively shaping it.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default VisionPage;