import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Cloud, Server, ArrowRight, CheckCircle, Zap, Shield, Target } from 'lucide-react';
import PageHeader from '../../components/layout/PageHeader';

const CloudPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Cloud Industry Solutions | Tekvoro Technologies"
        description="Accelerate your cloud transformation with our comprehensive cloud solutions. We help organizations migrate, optimize, and scale their infrastructure in the cloud."
        keywords="cloud solutions, cloud migration, cloud consulting, cloud infrastructure, AWS, Azure, Google Cloud, cloud optimization"
        ogImage="/images/cloud-industry-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Cloud Industry Solutions",
          "description": "Accelerate your cloud transformation with comprehensive cloud solutions",
          "provider": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          },
          "serviceType": "Cloud Consulting"
        }}
      />
      <Navbar />
      <div className="animate-fade-in">
        <PageHeader
          title="Cloud & Cybersecurity"
          description="Secure and scalable cloud solutions to power your digital transformation journey."
          bgImage="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        <section className="section">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                  Cloud Solutions for Modern Business
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Our cloud and cybersecurity solutions help businesses modernize their infrastructure while ensuring robust security and compliance.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  We provide comprehensive cloud services and security solutions tailored to your specific needs and industry requirements.
                </p>
                <ul className="space-y-4">
                  {[
                    'Cloud Migration & Strategy',
                    'Infrastructure Security',
                    'Data Protection & Privacy',
                    'Compliance Management',
                    'Disaster Recovery'
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-6 w-6 text-primary-600 dark:text-primary-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                Cloud Solutions for Modern Business
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Our cloud and cybersecurity solutions help businesses modernize their infrastructure while ensuring robust security and compliance.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                We provide comprehensive cloud services and security solutions tailored to your specific needs and industry requirements.
              </p>
              <ul className="space-y-4">
                {[
                  'Cloud Migration & Strategy',
                  'Infrastructure Security',
                  'Data Protection & Privacy',
                  'Compliance Management',
                  'Disaster Recovery'
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
                src="https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Cloud Solutions"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white text-center mb-12">
            Our Cloud Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Cloud Migration',
                description: 'Seamless transition of your applications and data to the cloud.',
                image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Security Solutions',
                description: 'Comprehensive cybersecurity services and threat protection.',
                image: 'https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
              },
              {
                title: 'Cloud Management',
                description: 'Ongoing support and optimization of cloud infrastructure.',
                image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
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
    <Footer />
  );
};

export default CloudPage;