import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

const TestimonialsSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      };
    },
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => {
      return {
        x: direction < 0 ? '100%' : '-100%',
        opacity: 0
      };
    }
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setTimeout(() => {
        setDirection(1);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <section className="section bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Hear from our satisfied clients about their experience working with Tekvoro Technologies.
          </p>
        </div>

        <div 
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden relative rounded-xl bg-white dark:bg-gray-900 shadow-lg p-8 md:p-12 min-h-[300px]">
            <div className="absolute top-6 left-6 text-primary-200 opacity-60 rotate-180">
              <Quote className="h-16 w-16" />
            </div>
            
            <AnimatePresence mode="wait" custom={direction} initial={false}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <div className="flex flex-col items-center text-center z-10">
                  <img 
                    src={testimonials[currentIndex].avatar} 
                    alt={testimonials[currentIndex].name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-primary-100 dark:border-primary-900 mb-4"
                  />
                  <h4 className="text-xl font-semibold text-secondary-900 dark:text-white">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {testimonials[currentIndex].position}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 text-lg italic mb-4">
                    "{testimonials[currentIndex].quote}"
                  </p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg 
                        key={i}
                        className={`w-5 h-5 ${
                          i < testimonials[currentIndex].rating 
                            ? 'text-yellow-400' 
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-6 gap-4">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Previous testimonial"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2.5 w-2.5 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-primary-600'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
              aria-label="Next testimonial"
            >
              <ArrowRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSlider;