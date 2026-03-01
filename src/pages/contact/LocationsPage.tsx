import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import PageHeader from '../../components/layout/PageHeader';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const LocationsPage = () => {
  const locations = [
    {
      id: 1,
      name: 'Hyderabad Headquarters',
      address: '5-24-190, NTR Nagar, Gajularamaram, Hyderabad, Telangana – 500055',
      phone: '+91 9121331813',
      email: 'tekvoro@gmail.com',
      hours: 'Mon-Fri: 9:00 AM - 6:00 PM',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.976652876415!2d78.43033767068573!3d17.50123448895236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c7c4c87bf7f%3A0x32ae3deb4e67b392!2sGajularamaram%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1622894953373!5m2!1sen!2sin',
      primary: true
    },
    {
      id: 2,
      name: 'Silicon Valley Office',
      address: '123 Innovation Drive, Palo Alto, CA 94301, USA',
      phone: '+1 (555) 123-4567',
      email: 'usa@tekvoro.com',
      hours: 'Mon-Fri: 8:00 AM - 5:00 PM PST',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.639!2d-122.1430195!3d37.4419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI2JzMwLjgiTiAxMjLCsDA4JzM0LjkiVw!5e0!3m2!1sen!2sus!4v1622894953373!5m2!1sen!2sus',
      primary: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Our Locations | Tekvoro Technologies"
        description="Find our offices and locations worldwide. Connect with our local teams and discover how we serve clients across different regions and time zones."
        keywords="locations, offices, global presence, worldwide offices, local teams, regional offices, contact locations"
        ogImage="/images/locations-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Our Locations",
          "description": "Find our offices and locations worldwide",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <div className="animate-fade-in">
        <PageHeader
          title="Office Locations"
          description="Find our offices worldwide and get in touch with our local teams."
          bgImage="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        <section className="section px-4">
          <div className="container-custom">
            <div className="space-y-16">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="card overflow-hidden">
                      <div className="h-64 sm:h-80 w-full">
                        <iframe 
                          src={location.mapUrl}
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy"
                          title={`${location.name} location`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-2xl font-bold text-secondary-900 dark:text-white">
                            {location.name}
                          </h3>
                          {location.primary && (
                            <span className="ml-3 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-3 py-1 rounded-full text-sm font-medium">
                              Headquarters
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-start">
                          <MapPin className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">Address</h4>
                            <p className="text-gray-700 dark:text-gray-300">{location.address}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Phone className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">Phone</h4>
                            <a 
                              href={`tel:${location.phone}`}
                              className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              {location.phone}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Mail className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">Email</h4>
                            <a 
                              href={`mailto:${location.email}`}
                              className="text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              {location.email}
                            </a>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <Clock className="h-5 w-5 text-primary-600 dark:text-primary-400 mr-3 mt-1" />
                          <div>
                            <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">Business Hours</h4>
                            <p className="text-gray-700 dark:text-gray-300">{location.hours}</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4">
                        <button className="btn btn-primary">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LocationsPage;