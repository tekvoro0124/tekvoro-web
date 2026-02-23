import { motion } from 'framer-motion';
import PageHeader from '../../components/layout/PageHeader';

const IoTPage = () => {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="IoT & Smart Solutions"
        description="Connect and optimize your devices with our innovative IoT solutions and smart technology implementations."
        bgImage="https://images.pexels.com/photos/3912472/pexels-photo-3912472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Smart Solutions for a Connected World
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our IoT solutions help businesses leverage the power of connected devices and smart technology to improve efficiency, gather valuable data, and create innovative user experiences.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We develop custom IoT applications and implement smart solutions that drive digital transformation and operational excellence.
              </p>
              <ul className="space-y-4">
                {[
                  'Industrial IoT Solutions',
                  'Smart Home Automation',
                  'Connected Device Management',
                  'Real-time Monitoring Systems',
                  'IoT Data Analytics'
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
                src="https://images.pexels.com/photos/3912469/pexels-photo-3912469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="IoT Solutions"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white text-center mb-12">
            Our IoT Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Industrial IoT',
                description: 'Smart manufacturing and industrial automation solutions.',
                image: 'https://images.pexels.com/photos/3912469/pexels-photo-3912469.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Smart Home',
                description: 'Home automation and smart device integration systems.',
                image: 'https://images.pexels.com/photos/3912472/pexels-photo-3912472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'IoT Analytics',
                description: 'Data collection and analysis from connected devices.',
                image: 'https://images.pexels.com/photos/3912475/pexels-photo-3912475.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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

export default IoTPage;