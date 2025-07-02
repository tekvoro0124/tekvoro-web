import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import { projects } from '../../data/projects';

const FeaturedProjects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredProjects = activeFilter === 'all' 
    ? projects.slice(0, 6) 
    : projects.filter(project => project.category === activeFilter).slice(0, 6);

  const filters = [
    { id: 'all', name: 'All' },
    { id: 'ai', name: 'AI Solutions' },
    { id: 'web', name: 'Web Apps' },
    { id: 'mobile', name: 'Mobile Apps' },
  ];

  return (
    <section className="section">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-secondary-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Take a look at some of our recent work that showcases our expertise and capabilities.
          </p>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mb-10">
          {filters.map(filter => (
            <button
              key={filter.id}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="card group overflow-hidden"
            >
              <div className="relative overflow-hidden aspect-video">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button size="sm">View Project</Button>
                </div>
                <div className="absolute top-4 right-4 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {project.category === 'ai' ? 'AI Solution' : 
                   project.category === 'web' ? 'Web App' : 
                   project.category === 'mobile' ? 'Mobile App' : 
                   'Custom Solution'}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-secondary-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                <Link to="/services" className="text-primary-600 dark:text-primary-400 font-medium inline-flex items-center group/link">
                  <span className="group-hover/link:underline">View Details</span>
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-700 dark:text-gray-300">
              No projects found in this category. Check back soon!
            </p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/services">
            <Button size="lg">
              View All Projects
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;