import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      // Reset submission status after a delay
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1000);
  };
  
  return (
    <section className="section" id="contact">
      <div className="container-custom">
        {/* Hero text for Contact Us */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-secondary-900 dark:text-white mb-4 tracking-tight">
            Contact Us
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Let's build something amazing together. Reach out for project inquiries, partnerships, or just to say hello!
          </p>
          <a href="#contact-form" className="inline-block px-8 py-3 rounded-lg bg-black text-white font-bold shadow-lg hover:bg-red-500 hover:text-white transition text-lg">
            Start a Conversation
          </a>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-8">
              Have a question or need a custom solution? Fill out the form or contact us directly and we'll get back to you promptly.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    Our Location
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    5-24-190, NTR Nagar, Gajularamaram, Hyderabad, Telangana – 500055
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    Email Us
                  </h3>
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
                  <h3 className="font-semibold text-secondary-900 dark:text-white mb-1">
                    Call Us
                  </h3>
                  <a 
                    href="tel:+919121331813"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    +91 9121331813
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-4">
                Find Us
              </h3>
              <div className="rounded-lg overflow-hidden h-[300px] shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.976652876415!2d78.43033767068573!3d17.50123448895236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9c7c4c87bf7f%3A0x32ae3deb4e67b392!2sGajularamaram%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1622894953373!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Tekvoro office location"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8" id="contact-form">
              <h3 className="text-2xl font-semibold text-secondary-900 dark:text-white mb-6">
                Send Us a Message
              </h3>
              
              {isSubmitted ? (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4 text-green-800 dark:text-green-200 mb-6">
                  <p className="flex items-center font-medium">
                    <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Message sent successfully!
                  </p>
                  <p className="mt-2 text-sm">We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="johndoe@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  
                  <Button 
                    type="submit" 
                    isLoading={isSubmitting}
                    fullWidth
                    size="lg"
                    className="mt-2"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;