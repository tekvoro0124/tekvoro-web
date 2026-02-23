import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';

const HealthcarePage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Healthcare Technology"
        description="Revolutionizing healthcare with innovative digital solutions that improve patient outcomes and streamline operations."
        bgImage="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Digital Health Solutions
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our healthcare technology solutions help medical institutions improve patient care, streamline operations, and ensure compliance with healthcare regulations.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We develop secure, HIPAA-compliant applications that enhance the healthcare experience for both providers and patients.
              </p>
              <ul className="space-y-4">
                {[
                  'Electronic Health Records (EHR)',
                  'Telemedicine Platforms',
                  'Patient Management Systems',
                  'Medical Device Integration',
                  'Healthcare Analytics'
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img 
                src="https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Healthcare Technology"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white text-center mb-12">
            Our Healthcare Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'EHR Systems',
                description: 'Comprehensive electronic health record management systems.',
                image: 'https://images.pexels.com/photos/3786157/pexels-photo-3786157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Telemedicine',
                description: 'Remote healthcare delivery and consultation platforms.',
                image: 'https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Healthcare Analytics',
                description: 'Data-driven insights for improved patient outcomes.',
                image: 'https://images.pexels.com/photos/3786160/pexels-photo-3786160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden"
              >
                <div className="aspect-video">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthcarePage;