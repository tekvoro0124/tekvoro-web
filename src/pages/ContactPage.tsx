import { motion } from 'framer-motion';
import PageHeader from '../components/layout/PageHeader';
import ContactSection from '../components/sections/ContactSection';

const ContactPage = () => {
  return (
    <div className="animate-fade-in">
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