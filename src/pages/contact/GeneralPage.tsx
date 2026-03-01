import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import PageHeader from '../../components/layout/PageHeader';
import { Mail, Phone, MessageCircle, Calendar, Users, Building } from 'lucide-react';

const GeneralPage = () => {
  const contactReasons = [
    {
      icon: Building,
      title: 'Business Partnerships',
      description: 'Explore partnership opportunities and strategic collaborations.',
      contact: 'partnerships@tekvoro.com'
    },
    {
      icon: Users,
      title: 'Career Opportunities',
      description: 'Join our team and be part of our innovative journey.',
      contact: 'careers@tekvoro.com'
    },
    {
      icon: MessageCircle,
      title: 'Media & Press',
      description: 'Media inquiries, press releases, and company information.',
      contact: 'press@tekvoro.com'
    },
    {
      icon: Calendar,
      title: 'Speaking Engagements',
      description: 'Invite our experts to speak at your events and conferences.',
      contact: 'speakers@tekvoro.com'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="General Contact | Tekvoro Technologies"
        description="Get in touch with us for general inquiries, partnerships, or any questions about our services. Our team is here to help you find the right solutions for your business."
        keywords="contact, general contact, get in touch, contact us, inquiries, customer service, support contact"
        ogImage="/images/general-contact-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "General Contact",
          "description": "Get in touch with us for general inquiries and partnerships",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      <div className="animate-fade-in">
        <PageHeader
          title="General Inquiries"
          description="Get in touch with us for general questions, partnerships, and other business inquiries."
          bgImage="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        />

        <section className="section px-4">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-6">
                We'd Love to Hear From You
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Whether you have questions about our services, want to explore partnership opportunities, or just want to say hello, we're here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {contactReasons.map((reason, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="card p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                      <reason.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-secondary-900 dark:text-white mb-2">
                        {reason.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">
                        {reason.description}
                      </p>
                      <a 
                        href={`mailto:${reason.contact}`}
                        className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                      >
                        {reason.contact}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Primary Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                      <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        General Email
                      </h4>
                      <a 
                        href="mailto:tekvoro@gmail.com"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        tekvoro@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                      <Phone className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary-900 dark:text-white mb-1">
                        Phone Number
                      </h4>
                      <a 
                        href="tel:+919121331813"
                        className="text-primary-600 dark:text-primary-400 hover:underline"
                      >
                        +91 9121331813
                      </a>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-lg p-6">
                    <h4 className="font-semibold text-secondary-900 dark:text-white mb-2">
                      Business Hours
                    </h4>
                    <p className="text-gray-700 dark:text-gray-300">
                      Monday - Friday: 9:00 AM - 6:00 PM IST<br />
                      Saturday: 10:00 AM - 2:00 PM IST<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-secondary-900 dark:text-white mb-6">
                  Send Us a Message
                </h3>
                <div className="card p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Your Company"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Inquiry Type
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                        <option>General Question</option>
                        <option>Business Partnership</option>
                        <option>Career Opportunity</option>
                        <option>Media Inquiry</option>
                        <option>Speaking Engagement</option>
                        <option>Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        placeholder="Tell us about your inquiry..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      />
                    </div>

                    <button type="submit" className="btn btn-primary w-full">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default GeneralPage;