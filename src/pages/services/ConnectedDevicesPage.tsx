import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { TabletSmartphone, Watch, Router, Thermometer, Wifi, Zap } from 'lucide-react';

const devices = [
  {
    icon: <TabletSmartphone className="w-10 h-10 text-red-500 mb-3" />,
    name: 'Smartphones & Tablets',
    description: 'Seamlessly connect and manage mobile devices for real-time data and control.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Watch className="w-10 h-10 text-red-500 mb-3" />,
    name: 'Wearables',
    description: 'Track health, fitness, and more with connected smartwatches and wearables.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Router className="w-10 h-10 text-red-500 mb-3" />,
    name: 'Routers & Gateways',
    description: 'Enable secure, scalable connectivity for all your IoT devices.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  },
  {
    icon: <Thermometer className="w-10 h-10 text-red-500 mb-3" />,
    name: 'Sensors',
    description: 'Monitor temperature, humidity, motion, and more with advanced IoT sensors.',
    image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80',
  },
];

const timeline = [
  {
    step: 'Device Onboarding',
    desc: 'Easily add and authenticate new devices to your network.',
    icon: <Wifi className="w-7 h-7 text-red-500" />,
  },
  {
    step: 'Real-Time Monitoring',
    desc: 'Track device status, health, and data streams in real time.',
    icon: <Zap className="w-7 h-7 text-red-500" />,
  },
  {
    step: 'Remote Management',
    desc: 'Update, configure, and troubleshoot devices from anywhere.',
    icon: <Router className="w-7 h-7 text-red-500" />,
  },
  {
    step: 'Data Insights',
    desc: 'Leverage analytics to gain actionable insights from device data.',
    icon: <TabletSmartphone className="w-7 h-7 text-red-500" />,
  },
];

const ConnectedDevicesPage = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />
      {/* Animated Hero with Device Grid */}
      <section className="relative w-full bg-gradient-to-br from-black via-gray-900 to-neutral-900 text-white overflow-hidden py-20">
        <div className="container-custom flex flex-col items-center gap-12">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent drop-shadow-lg text-center"
          >
            Connected Devices
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl mb-8 font-light text-center"
          >
            Connect, monitor, and manage all your IoT devices with ease—unlocking new possibilities for smart living and business.
          </motion.p>
          {/* Device Showcase Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
            {devices.map((device, idx) => (
              <motion.div
                key={device.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-gray-900 via-black to-neutral-950 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center border border-white/10 hover:shadow-lg hover:scale-105 transition-all"
              >
                {device.icon}
                <img
                  src={device.image}
                  alt={device.name}
                  className="w-full h-28 object-cover rounded-lg mb-3 border border-white/10 shadow"
                  loading="lazy"
                />
                <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                  {device.name}
                </h3>
                <p className="text-gray-300">
                  {device.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vertical Timeline Section */}
      <section className="py-20 bg-black/90">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-lg text-gray-400">
              From onboarding to insights—see the journey of your connected devices.
            </p>
          </div>
          <div className="relative border-l-4 border-red-600 pl-10">
            {timeline.map((item, idx) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="mb-12 flex items-start gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-black border-4 border-red-600 rounded-full p-3 mb-2">
                    {item.icon}
                  </div>
                  {idx < timeline.length - 1 && <div className="h-16 w-1 bg-red-600 rounded-full" />}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-1">{item.step}</h4>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-black via-gray-900 to-neutral-900 text-white text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Ready to Connect Your Devices?
          </h2>
          <p className="text-lg text-gray-300 mb-8">
            Start your IoT journey with Tekvoro. Book a consultation or talk to our experts.
          </p>
          <a href="#contact" className="inline-block px-10 py-4 rounded-lg bg-red-600 text-white font-bold shadow-lg hover:bg-white hover:text-black transition text-lg">
            Book a Consultation
          </a>
        </motion.div>
        {/* Animated background shapes */}
        <motion.div
          className="absolute left-0 top-0 w-40 h-40 bg-gradient-to-br from-red-900/40 via-black/0 to-black/0 rounded-full blur-2xl opacity-40 animate-pulse"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 8 }}
        />
        <motion.div
          className="absolute right-0 bottom-0 w-60 h-60 bg-gradient-to-tr from-white/10 via-gray-700/20 to-black/0 rounded-full blur-2xl opacity-30 animate-pulse"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 9 }}
        />
      </section>

      <Footer />
    </div>
  );
};

export default ConnectedDevicesPage; 