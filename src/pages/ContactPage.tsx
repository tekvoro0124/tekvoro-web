import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import ContactSection from '../components/sections/ContactSection';
import SEO from '../components/SEO';

const ContactPage = () => {
  return (
    <div className="animate-fade-in">
      <SEO 
        title="Contact Us | Tekvoro Technologies"
        description="Get in touch with our team. We're here to answer your questions and help with your IT needs. Contact us for consultations, support, or partnerships."
        keywords="contact us, get in touch, customer service, support, consultations, partnerships, contact information"
        ogImage="/images/contact-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Contact Us",
          "description": "Get in touch with our team for consultations, support, or partnerships",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <PageHeader
        title="Contact Us"
        description="Get in touch with our team. We're here to answer your questions and help with your IT needs."
        bgImage="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ContactSection />
      </motion.div>
    </div>
  );
};

export default ContactPage;