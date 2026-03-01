import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SEO from '../components/SEO';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, CheckCircle, Sparkles, Zap, Target, Users, ChevronRight, ChevronLeft } from 'lucide-react';
import emailService from '../services/emailService';

const steps = [
  { id: 0, title: 'Your Info', icon: <User className="w-5 h-5" /> },
  { id: 1, title: 'Select Solution', icon: <Target className="w-5 h-5" /> },
  { id: 2, title: 'Pick Date/Time', icon: <Calendar className="w-5 h-5" /> },
  { id: 3, title: 'Confirm', icon: <CheckCircle className="w-5 h-5" /> },
];

const solutions = [
  {
    id: 'ai-solutions',
    name: 'AI Solutions',
    description: 'Custom AI, ML, and automation',
    icon: <Sparkles className="w-6 h-6" />,
    color: 'from-yellow-400/20 to-orange-500/20',
    border: 'border-yellow-400/30',
    features: ['Custom AI Models', 'ML Pipelines', 'Automation']
  },
  {
    id: 'cloud-solutions',
    name: 'Cloud Solutions',
    description: 'Scalable cloud infrastructure',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-400/20 to-cyan-500/20',
    border: 'border-blue-400/30',
    features: ['Multi-Cloud', 'Serverless', 'Security']
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity',
    description: 'AI-powered security',
    icon: <Target className="w-6 h-6" />,
    color: 'from-red-400/20 to-pink-500/20',
    border: 'border-red-400/30',
    features: ['AI Security', 'Threat Detection', 'Compliance']
  },
  {
    id: 'iot-devices',
    name: 'IoT & Smart Devices',
    description: 'Connect and optimize with IoT',
    icon: <Users className="w-6 h-6" />,
    color: 'from-green-400/20 to-emerald-500/20',
    border: 'border-green-400/30',
    features: ['Smart Cities', 'Industrial IoT', 'Analytics']
  },
];

const testimonials = [
  { 
    name: 'Priya Sharma', 
    quote: 'The demo was a game-changer for our team. We saw immediate value.',
    role: 'CTO, TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
  { 
    name: 'Ananya Rao', 
    quote: 'Tekvoro made it easy to see real value. The process was seamless.',
    role: 'VP Engineering, DataFlow',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5
  },
];

const BookDemoPage = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    company: '',
    solution: solutions[0].id, 
    date: '', 
    time: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function next() { 
    setStep(s => Math.min(s + 1, steps.length - 1)); 
  }
  
  function prev() { 
    setStep(s => Math.max(s - 1, 0)); 
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Send demo booking email using the email service
      const emailResponse = await emailService.sendDemoBooking({
        name: form.name,
        email: form.email,
        company: form.company,
        solution: selectedSolution?.name,
        date: form.date,
        time: form.time,
        message: form.notes
      });

      if (!emailResponse.success) {
        throw new Error(emailResponse.error || 'Failed to send email notification');
      }

      console.log('Demo booking email sent:', emailResponse);

      // Then, submit to the main booking system
      const apiUrl = import.meta.env.VITE_API_URL || 'https://tekvoro-web-production.up.railway.app';
      const emailUrl = import.meta.env.DEV 
        ? 'http://localhost:5002/api/email/book-demo'
        : `${apiUrl}/api/email/book-demo`;
      
      const response = await fetch(emailUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit demo request');
      }

      setSubmitted(true);
      setTimeout(() => setStep(3), 1000);
    } catch (error) {
      console.error('Demo submission error:', error);
      setSubmitError(error instanceof Error ? error.message : 'Failed to submit demo request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const selectedSolution = solutions.find(s => s.id === form.solution);

  return (
    <>
      <SEO
        title="Book a Demo - Tekvoro Technologies AI Solutions"
        description="Schedule a personalized demo of Tekvoro's AI solutions, cloud computing services, and digital transformation capabilities. See how our technology can transform your business."
        keywords="book demo, AI demo, technology demo, cloud computing demo, digital transformation demo, schedule demo, product demonstration"
        canonical="https://www.tekvoro.com/book-demo"
      />
      <div className="bg-black min-h-screen flex flex-col overflow-hidden">
        <Navbar />
        
        {/* Immersive Hero with Parallax */}
        <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-32">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`
            }} />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>

          {/* Floating Elements */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 rounded-full blur-3xl"
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-400/20 to-cyan-500/20 rounded-full blur-2xl"
            animate={{ 
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />

          <div className="container-custom relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Floating Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-8 flex flex-wrap justify-center gap-3"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-yellow-400 text-sm font-semibold">
                  <Sparkles className="w-4 h-4" />
                  AI 2025 Demo
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-6xl md:text-8xl font-black tracking-tight mb-8"
              >
                <span className="bg-gradient-to-r from-white via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                  Book a
                </span>
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                  Demo
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed"
              >
                Experience the future of technology—schedule a personalized demo with our experts and see how Tekvoro can transform your business.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Enhanced Stepper */}
        <section className="py-16 bg-gradient-to-b from-black to-neutral-950 relative">
          <div className="container-custom max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                {steps.map((s, idx) => (
                  <div key={s.id} className="flex flex-col items-center">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl flex items-center justify-center font-bold text-lg mb-3 border-2 transition-all duration-500 ${
                        step >= idx 
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-400 shadow-lg shadow-yellow-500/25' 
                          : 'bg-white/10 text-gray-400 border-white/20 backdrop-blur-md'
                      }`}
                      whileHover={{ scale: step >= idx ? 1.1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {s.icon}
                    </motion.div>
                    <div className={`text-sm font-semibold ${step >= idx ? 'text-yellow-400' : 'text-gray-400'}`}>
                      {s.title}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Progress Line */}
              <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                  initial={{ width: '0%' }}
                  animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Form Content */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 0: Personal Info */}
                <AnimatePresence mode="wait">
                  {step === 0 && (
                    <motion.div
                      key="step-0"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Tell us about yourself</h3>
                        <p className="text-gray-400">Let's start with your basic information</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-white font-semibold">Full Name *</label>
                          <input
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                            value={form.name}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-white font-semibold">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                            value={form.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-white font-semibold">Company</label>
                        <input
                          type="text"
                          name="company"
                          placeholder="Enter your company name"
                          className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                          value={form.company}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: Solution Selection */}
                  {step === 1 && (
                    <motion.div
                      key="step-1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Choose your solution</h3>
                        <p className="text-gray-400">Select the solution you'd like to explore</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {solutions.map((solution) => (
                          <motion.div
                            key={solution.id}
                            className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                              form.solution === solution.id
                                ? `${solution.border} bg-gradient-to-br ${solution.color}`
                                : 'border-white/20 bg-white/5 hover:border-white/40'
                            }`}
                            onClick={() => setForm({ ...form, solution: solution.id })}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`p-3 rounded-xl ${
                                form.solution === solution.id ? 'bg-white/20' : 'bg-white/10'
                              }`}>
                                {solution.icon}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-white mb-2">{solution.name}</h4>
                                <p className="text-gray-400 text-sm mb-3">{solution.description}</p>
                                <div className="flex flex-wrap gap-1">
                                  {solution.features.map((feature) => (
                                    <span key={feature} className="px-2 py-1 rounded-full bg-white/10 text-white text-xs">
                                      {feature}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Date & Time */}
                  {step === 2 && (
                    <motion.div
                      key="step-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2">Schedule your demo</h3>
                        <p className="text-gray-400">Pick a date and time that works for you</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-white font-semibold">Preferred Date *</label>
                          <input
                            type="date"
                            name="date"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                            value={form.date}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-white font-semibold">Preferred Time *</label>
                          <input
                            type="time"
                            name="time"
                            className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                            value={form.time}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-white font-semibold">Additional Notes</label>
                        <textarea
                          name="notes"
                          placeholder="Tell us about your specific needs or questions..."
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all resize-none"
                          value={form.notes}
                          onChange={handleChange}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Confirmation */}
                  {step === 3 && (
                    <motion.div
                      key="step-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <AnimatePresence mode="wait">
                        {!submitted ? (
                          <motion.div
                            key="confirmation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="space-y-6"
                          >
                            <div className="text-center mb-8">
                              <h3 className="text-2xl font-bold text-white mb-2">Confirm your demo</h3>
                              <p className="text-gray-400">Please review your details before booking</p>
                            </div>
                            
                            <div className="bg-white/5 rounded-2xl p-6 space-y-4">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <span className="text-gray-400 text-sm">Name:</span>
                                  <p className="text-white font-semibold">{form.name}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Email:</span>
                                  <p className="text-white font-semibold">{form.email}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Company:</span>
                                  <p className="text-white font-semibold">{form.company || 'Not specified'}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Solution:</span>
                                  <p className="text-white font-semibold">{selectedSolution?.name}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Date:</span>
                                  <p className="text-white font-semibold">{form.date}</p>
                                </div>
                                <div>
                                  <span className="text-gray-400 text-sm">Time:</span>
                                  <p className="text-white font-semibold">{form.time}</p>
                                </div>
                              </div>
                              {form.notes && (
                                <div>
                                  <span className="text-gray-400 text-sm">Notes:</span>
                                  <p className="text-white">{form.notes}</p>
                                </div>
                              )}
                            </div>
                            
                            {/* Error Message */}
                            {submitError && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-4 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 text-sm"
                              >
                                {submitError}
                              </motion.div>
                            )}
                            
                            <motion.button
                              type="submit"
                              disabled={isSubmitting}
                              className={`w-full py-4 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 ${
                                isSubmitting 
                                  ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                                  : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:shadow-yellow-500/25'
                              }`}
                              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                            >
                              {isSubmitting ? (
                                <div className="flex items-center justify-center gap-2">
                                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                                  Sending Request...
                                </div>
                              ) : (
                                'Book Demo'
                              )}
                            </motion.button>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                              className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                              <CheckCircle className="w-10 h-10 text-white" />
                            </motion.div>
                            
                            <h3 className="text-3xl font-bold text-white mb-4">Demo Booked Successfully!</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto">
                              We've sent a confirmation email with calendar details. Our team will reach out shortly to prepare for your personalized demo.
                            </p>
                            
                            <motion.a
                              href={`data:text/calendar;charset=utf-8,${encodeURIComponent(`BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Tekvoro Demo - ${selectedSolution?.name}\nDTSTART:${form.date.replace(/-/g, '')}T${form.time.replace(':', '')}00Z\nDTEND:${form.date.replace(/-/g, '')}T${form.time.replace(':', '')}00Z\nDESCRIPTION:Tekvoro Demo\nEND:VEVENT\nEND:VCALENDAR`)}`}
                              download={`Tekvoro_Demo_${selectedSolution?.name.replace(/\s+/g, '_')}.ics`}
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Calendar className="w-5 h-5" />
                              Download Calendar Invite
                            </motion.a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {step < 3 && (
                  <div className="flex gap-4 pt-6">
                    {step > 0 && (
                      <motion.button
                        type="button"
                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md text-white font-semibold hover:bg-white/20 transition-all duration-300"
                        onClick={prev}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ChevronLeft className="w-5 h-5" />
                        Back
                      </motion.button>
                    )}
                    
                    <motion.button
                      type="button"
                      className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 ml-auto"
                      onClick={next}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials */}
        <section className="py-24 bg-gradient-to-b from-neutral-950 to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                What Our <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Clients</span> Say
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Real results from real businesses using Tekvoro solutions
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {testimonials.map((t, idx) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-500">
                    <div className="flex items-start gap-4 mb-6">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-yellow-400/30"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-white text-lg">{t.name}</div>
                        <div className="text-yellow-400 text-sm">{t.role}</div>
                        <div className="flex gap-1 mt-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400">★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 italic text-lg leading-relaxed">
                      "{t.quote}"
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default BookDemoPage;