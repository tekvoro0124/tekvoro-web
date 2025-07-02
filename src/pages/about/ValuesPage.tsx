import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import { Heart, Shield, Users, Zap, Award, Globe } from 'lucide-react';

const ValuesPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We conduct business with honesty, transparency, and ethical practices in all our interactions.'
    },
    {
      icon: Shield,
      title: 'Quality',
      description: 'We deliver exceptional quality in every project, ensuring our solutions meet the highest standards.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of teamwork and foster collaborative relationships with clients and partners.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously explore new technologies and methodologies to stay ahead of industry trends.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for excellence in everything we do, from project delivery to customer service.'
    },
    {
      icon: Globe,
      title: 'Sustainability',
      description: 'We are committed to creating sustainable solutions that benefit both business and society.'
    }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Our Values"
        description="The core principles that guide our decisions, shape our culture, and define who we are as a company."
        bgImage="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
              What We Stand For
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our values are more than just words on a page – they're the foundation of our company culture and the driving force behind every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-fit mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Living Our Values
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                These values aren't just aspirational – they're actively practiced in our daily operations and client relationships.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                  In Our Work
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Delivering projects on time and within budget
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Maintaining transparent communication throughout projects
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Continuously improving our processes and methodologies
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Investing in the latest technologies and training
                  </li>
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                  In Our Culture
                </h3>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Fostering an inclusive and diverse workplace
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Encouraging continuous learning and development
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Supporting work-life balance for all team members
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    Recognizing and celebrating achievements
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ValuesPage;