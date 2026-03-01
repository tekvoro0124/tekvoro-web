import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import { Code, Puzzle, Wrench, Lightbulb, Shield, Rocket } from 'lucide-react';

const CustomPage = () => {
  const services = [
    {
      icon: Code,
      title: 'Custom Development',
      description: 'Bespoke software solutions tailored to your unique business requirements.',
      features: ['Custom Applications', 'API Development', 'Integration Solutions', 'Legacy Modernization']
    },
    {
      icon: Puzzle,
      title: 'System Integration',
      description: 'Seamlessly connect disparate systems and applications for unified operations.',
      features: ['Third-party Integrations', 'Data Synchronization', 'Workflow Automation', 'Enterprise Connectivity']
    },
    {
      icon: Wrench,
      title: 'Custom Tools',
      description: 'Specialized tools and utilities designed to solve specific business challenges.',
      features: ['Productivity Tools', 'Automation Scripts', 'Custom Plugins', 'Business Utilities']
    },
    {
      icon: Shield,
      title: 'Enterprise Solutions',
      description: 'Scalable enterprise-grade solutions for complex business environments.',
      features: ['Enterprise Architecture', 'Scalability Planning', 'Security Implementation', 'Compliance Solutions']
    }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Custom Solutions"
        description="Tailored software solutions designed specifically for your unique business needs and challenges."
        bgImage="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
              Tailored for Your Success
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Every business is unique, and so are its challenges. Our custom solutions are designed from the ground up to address your specific needs and drive your business forward.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <div className="bg-primary-100 dark:bg-primary-900/30 p-4 rounded-full w-fit mb-6">
                  <service.icon className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-primary-600 mr-2">•</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomPage;