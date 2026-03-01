import { motion } from 'framer-motion';
import { Award, BookOpen, Clock, ChevronRight, Users } from 'lucide-react';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { fadeIn, staggerContainer } from '../utils/animations';
import PageHeader from '../components/layout/PageHeader';

const AboutPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="About Us"
        description="Learn more about our company, our mission, and the dedicated team behind Tekvoro Technologies."
        bgImage="https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Our Team" 
                className="rounded-lg shadow-lg"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-6"
            >
              <motion.h2 variants={fadeIn} className="text-3xl font-bold text-secondary-900 dark:text-white">
                Our Story
              </motion.h2>
              
              <motion.p variants={fadeIn} className="text-gray-700 dark:text-gray-300">
                Founded with a vision to bridge the gap between technology and business needs, Tekvoro Technologies has been at the forefront of digital innovation since our inception.
              </motion.p>
              
              <motion.p variants={fadeIn} className="text-gray-700 dark:text-gray-300">
                Our journey began with a small team of passionate developers and has grown into a comprehensive IT solutions provider with expertise across multiple domains including AI, web and mobile development, cloud services, and UI/UX design.
              </motion.p>
              
              <motion.p variants={fadeIn} className="text-gray-700 dark:text-gray-300">
                Today, we pride ourselves on delivering innovative, scalable, and reliable solutions that help businesses of all sizes achieve their digital transformation goals.
              </motion.p>
              
              <motion.div variants={fadeIn}>
                <Link to="/contact">
                  <Button>
                    Get in Touch
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CEO Bio Section */}
      <section className="section bg-gray-50 dark:bg-gray-800 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Meet Our Leadership
              </h2>
              
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-2">
                  Musugu Sanjeev
                </h3>
                <p className="text-primary-600 dark:text-primary-400 font-medium mb-4">
                  Founder & CEO, UI/UX Expert
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  With over 12 years of experience in UI/UX design and software development, Sanjeev has led numerous successful projects for clients ranging from startups to Fortune 500 companies.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  His passion for creating intuitive and engaging user experiences has been the driving force behind Tekvoro's commitment to excellence and innovation.
                </p>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-xl">
                  <img 
                    src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600" 
                    alt="Musugu Sanjeev" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-primary-600 text-white rounded-full p-6">
                  <p className="font-bold">12+</p>
                  <p className="text-sm">Years Exp.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="section px-4">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Vision & Mission
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-t-4 border-primary-600"
            >
              <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full w-fit mb-6">
                <BookOpen className="h-6 w-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To be the leading innovator in digital transformation, empowering businesses to thrive in an increasingly connected world through cutting-edge technology solutions that drive growth and create value.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border-t-4 border-accent-600"
            >
              <div className="bg-accent-100 dark:bg-accent-900/30 p-3 rounded-full w-fit mb-6">
                <Award className="h-6 w-6 text-accent-600 dark:text-accent-400" />
              </div>
              <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                To deliver innovative, high-quality technology solutions that solve real-world business challenges. We strive to exceed client expectations through expert consultation, meticulous execution, and exceptional support while fostering a culture of continuous learning and improvement.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="section bg-gray-50 dark:bg-gray-800 px-4">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Our Journey
            </h2>
            <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              From our humble beginnings to becoming a leader in IT solutions, here's how we've grown over the years.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-primary-200 dark:bg-primary-800"></div>

            <div className="space-y-12">
              {/* 2019 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Foundation</h3>
                    <div className="flex items-center justify-end">
                      <Clock className="h-4 w-4 text-primary-600 mr-1" />
                      <span className="text-primary-600 font-semibold">2019</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                      Tekvoro Technologies was founded with a focus on providing UI/UX design services for startups.
                    </p>
                  </div>
                </div>
                <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 md:pl-8"></div>
              </motion.div>

              {/* 2020 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:pr-8"></div>
                <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Expansion</h3>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary-600 mr-1" />
                      <span className="text-primary-600 font-semibold">2020</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                      Expanded our services to include web and mobile app development, growing our team to 15 professionals.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* 2022 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:text-right md:pr-8 mb-4 md:mb-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">AI Innovation</h3>
                    <div className="flex items-center justify-end">
                      <Clock className="h-4 w-4 text-primary-600 mr-1" />
                      <span className="text-primary-600 font-semibold">2022</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                      Launched our AI solutions division and established strategic partnerships with leading technology providers.
                    </p>
                  </div>
                </div>
                <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 md:pl-8"></div>
              </motion.div>

              {/* 2024 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row items-center"
              >
                <div className="flex-1 md:pr-8"></div>
                <div className="z-10 flex items-center justify-center w-10 h-10 rounded-full bg-primary-600 text-white shadow-md">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 md:pl-8 mb-4 md:mb-0">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">Global Reach</h3>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-primary-600 mr-1" />
                      <span className="text-primary-600 font-semibold">2024</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mt-3">
                      Expanded operations internationally, with a new office in Silicon Valley and clients across 15+ countries.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;