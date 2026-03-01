import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';
import { Cog, Zap, Settings, Code, Database, Cloud } from 'lucide-react';

const EngineerPage = () => {
  const services = [
    {
      icon: Cog,
      title: 'System Engineering',
      description: 'Design and implement robust system architectures that scale with your business needs.',
      features: ['Microservices Architecture', 'Load Balancing', 'Performance Optimization', 'System Integration']
    },
    {
      icon: Zap,
      title: 'Process Automation',
      description: 'Automate repetitive tasks and workflows to improve efficiency and reduce errors.',
      features: ['Workflow Automation', 'CI/CD Pipelines', 'Testing Automation', 'Deployment Automation']
    },
    {
      icon: Database,
      title: 'Data Engineering',
      description: 'Build reliable data pipelines and infrastructure for analytics and machine learning.',
      features: ['Data Pipelines', 'ETL Processes', 'Data Warehousing', 'Real-time Processing']
    },
    {
      icon: Cloud,
      title: 'Infrastructure Engineering',
      description: 'Create scalable and secure cloud infrastructure using modern DevOps practices.',
      features: ['Infrastructure as Code', 'Container Orchestration', 'Monitoring & Logging', 'Security Implementation']
    }
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Engineer & Automate"
        description="Build robust, scalable systems and automate processes to drive efficiency and innovation."
        bgImage="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
              Engineering Excellence
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our engineering and automation services help businesses build reliable, scalable systems that drive growth and operational efficiency.
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

export default EngineerPage;