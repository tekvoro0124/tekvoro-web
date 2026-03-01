// @ts-nocheck
import { motion } from 'framer-motion';
import { Cpu, Globe, Smartphone, Cloud, Palette, Code } from 'lucide-react';
import PageHeader from '../components/layout/PageHeader';
import { useState, useEffect } from 'react';
import contentService from '../services/contentService';

// Default services for fallback
const DEFAULT_SERVICES = [
  {
    id: 1,
    name: 'AI Solutions',
    description: 'Custom AI solutions tailored to your specific needs, from machine learning models to natural language processing and computer vision systems.',
    icon: Cpu,
    features: [
      'Machine Learning Models',
      'Natural Language Processing',
      'Computer Vision',
      'Predictive Analytics',
      'AI Integration with Existing Systems'
    ]
  },
  {
    id: 2,
    name: 'Web Applications',
    description: 'Responsive, high-performance web applications built with modern frameworks and technologies.',
    icon: Globe,
    features: [
      'Custom Web Applications',
      'E-commerce Platforms',
      'Content Management Systems',
      'Progressive Web Apps',
      'Web Portals & Dashboards'
    ]
  },
  {
    id: 3,
    name: 'Mobile Applications',
    description: 'Native and cross-platform mobile applications for iOS and Android devices.',
    icon: Smartphone,
    features: [
      'iOS & Android Development',
      'Cross-platform Solutions',
      'Mobile UI/UX Design',
      'App Store Optimization',
      'Maintenance & Updates'
    ]
  },
  {
    id: 4,
    name: 'Cloud Services',
    description: 'Comprehensive cloud infrastructure setup, migration, and management services.',
    icon: Cloud,
    features: [
      'Cloud Migration',
      'Infrastructure as Code',
      'Serverless Architecture',
      'DevOps Implementation',
      'Cloud Security & Compliance'
    ]
  },
  {
    id: 5,
    name: 'UI/UX Design',
    description: 'User-centered design that combines aesthetics with functionality.',
    icon: Palette,
    features: [
      'User Research & Personas',
      'Wireframing & Prototyping',
      'Visual Design',
      'Usability Testing',
      'Design Systems'
    ]
  },
  {
    id: 6,
    name: 'Custom Software',
    description: 'Tailor-made software solutions designed to address your specific business challenges.',
    icon: Code,
    features: [
      'Requirements Analysis',
      'Custom Development',
      'Legacy System Integration',
      'API Development',
      'Maintenance & Support'
    ]
  }
];

const ServicesPage = () => {
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      try {
        const fetchedServices = await contentService.getServices();
        if (fetchedServices && fetchedServices.length > 0) {
          setServices(fetchedServices);
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  if (loading) {
    return (
      <div className="animate-fade-in">
        <PageHeader
          title="Our Services"
          description="Discover our comprehensive range of technology solutions designed to drive innovation and growth for your business."
          bgImage="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />
        <section className="section flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mb-4"></div>
            <p className="text-gray-700 dark:text-gray-300">Loading services...</p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Our Services"
        description="Discover our comprehensive range of technology solutions designed to drive innovation and growth for your business."
        bgImage="https://images.pexels.com/photos/7988079/pexels-photo-7988079.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Comprehensive IT Solutions
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              At Tekvoro Technologies, we offer a wide range of IT services designed to help businesses thrive in the digital era. From cutting-edge AI solutions to robust web and mobile applications, we have the expertise to bring your vision to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="card overflow-hidden"
              >
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                      <service.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h3 className="text-xl font-bold text-secondary-900 dark:text-white">
                      {service.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    {service.description}
                  </p>
                  <div>
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-3">
                      Key Features:
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700">
                  <button className="btn btn-primary w-full">Learn More</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;