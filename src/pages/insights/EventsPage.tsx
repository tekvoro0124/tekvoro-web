import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SEO from '../../components/SEO';
import { Calendar, Clock, MapPin, Users, ArrowRight, Search, Filter, ExternalLink, Play, CalendarDays } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'AI & Machine Learning Summit 2024',
    description: 'Join industry leaders and experts for a comprehensive exploration of AI and ML technologies, their applications, and future trends.',
    type: 'Conference',
    date: '2024-12-20',
    time: '09:00 AM - 06:00 PM',
    location: 'Hyderabad International Convention Centre',
    virtual: false,
    featured: true,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    speakers: ['Dr. Sarah Chen', 'Michael Rodriguez', 'Lisa Park'],
    attendees: 250,
    price: '$299',
    tags: ['AI', 'Machine Learning', 'Technology'],
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'Digital Transformation Webinar Series',
    description: 'A three-part webinar series covering digital transformation strategies, implementation, and best practices.',
    type: 'Webinar',
    date: '2024-12-18',
    time: '02:00 PM - 03:30 PM',
    location: 'Virtual Event',
    virtual: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80',
    speakers: ['James Thompson', 'Dr. Emily Watson'],
    attendees: 150,
    price: 'Free',
    tags: ['Digital Transformation', 'Strategy', 'Webinar'],
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'Cloud Computing Workshop',
    description: 'Hands-on workshop covering cloud architecture, deployment strategies, and cost optimization.',
    type: 'Workshop',
    date: '2024-12-15',
    time: '10:00 AM - 04:00 PM',
    location: 'Tekvoro Innovation Center',
    virtual: false,
    featured: false,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    speakers: ['David Kim', 'Alex Johnson'],
    attendees: 50,
    price: '$149',
    tags: ['Cloud Computing', 'Workshop', 'Hands-on'],
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'Cybersecurity Best Practices Seminar',
    description: 'Learn about the latest cybersecurity threats and best practices to protect your organization.',
    type: 'Seminar',
    date: '2024-12-10',
    time: '01:00 PM - 05:00 PM',
    location: 'Virtual Event',
    virtual: true,
    featured: false,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
    speakers: ['Dr. Emily Watson', 'Sarah Chen'],
    attendees: 200,
    price: 'Free',
    tags: ['Cybersecurity', 'Security', 'Best Practices'],
    status: 'past',
  },
  {
    id: 5,
    title: 'Startup Innovation Meetup',
    description: 'Network with fellow entrepreneurs and learn about the latest startup trends and opportunities.',
    type: 'Meetup',
    date: '2024-12-08',
    time: '06:00 PM - 09:00 PM',
    location: 'Hyderabad Startup Hub',
    virtual: false,
    featured: false,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    speakers: ['Michael Rodriguez', 'Lisa Park'],
    attendees: 75,
    price: '$25',
    tags: ['Startup', 'Innovation', 'Networking'],
    status: 'past',
  },
  {
    id: 6,
    title: 'Data Science & Analytics Conference',
    description: 'Explore the latest trends in data science, analytics, and business intelligence.',
    type: 'Conference',
    date: '2024-12-05',
    time: '09:00 AM - 06:00 PM',
    location: 'Bangalore Tech Park',
    virtual: false,
    featured: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    speakers: ['Dr. David Kim', 'Alex Johnson', 'Sarah Chen'],
    attendees: 300,
    price: '$399',
    tags: ['Data Science', 'Analytics', 'BI'],
    status: 'past',
  },
];

const eventTypes = ['All', 'Conference', 'Webinar', 'Workshop', 'Seminar', 'Meetup'];
const eventStatuses = ['All', 'upcoming', 'past'];

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || event.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || event.status === selectedStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  const featuredEvent = events.find(event => event.featured);
  const regularEvents = filteredEvents.filter(event => !event.featured);

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <SEO 
        title="Events & Webinars | Tekvoro Technologies"
        description="Join our upcoming events, webinars, and conferences. Connect with industry experts, learn about the latest technology trends, and network with peers."
        keywords="events, webinars, conferences, technology events, industry events, networking, tech conferences, virtual events"
        ogImage="/images/events-og.jpg"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Events & Webinars",
          "description": "Join our upcoming events, webinars, and conferences",
          "publisher": {
            "@type": "Organization",
            "name": "Tekvoro Technologies Pvt Ltd"
          }
        }}
      />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-br from-black via-neutral-900 to-black text-white overflow-hidden py-24">
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-white via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Events & Webinars
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Join us for insightful events, workshops, and webinars featuring industry experts and thought leaders.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4 mb-12"
          >
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50"
              />
            </div>
            
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {eventTypes.map((type) => (
                  <motion.button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      selectedType === type
                        ? 'bg-purple-400 text-black border-purple-400 shadow-lg'
                        : 'bg-black/50 text-purple-400 border-neutral-800 hover:bg-neutral-900 hover:border-purple-400'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {type}
                  </motion.button>
                ))}
              </div>
              
              <div className="flex gap-2 overflow-x-auto pb-2">
                {eventStatuses.map((status) => (
                  <motion.button
                    key={status}
                    onClick={() => setSelectedStatus(status)}
                    className={`px-6 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-all border-2 focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                      selectedStatus === status
                        ? 'bg-pink-400 text-black border-pink-400 shadow-lg'
                        : 'bg-black/50 text-pink-400 border-neutral-800 hover:bg-neutral-900 hover:border-pink-400'
                    }`}
                    whileTap={{ scale: 0.97 }}
                  >
                    {status === 'upcoming' ? 'Upcoming' : status === 'past' ? 'Past' : status}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          </div>
        </section>

      {/* Featured Event */}
      {featuredEvent && (
        <section className="py-16 bg-gradient-to-r from-neutral-900 to-black">
          <div className="container-custom">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 backdrop-blur-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="px-3 py-1 bg-purple-400 text-black text-sm font-bold rounded-full">
                      Featured Event
                    </span>
                    <span className="text-gray-400 text-sm">{featuredEvent.type}</span>
                    {featuredEvent.virtual && (
                      <span className="px-3 py-1 bg-pink-400/20 text-pink-400 text-sm rounded-full border border-pink-400/30">
                        Virtual
                      </span>
                    )}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    {featuredEvent.title}
                  </h2>
                  <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                    {featuredEvent.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar className="w-5 h-5 text-purple-400" />
                      <div>
                        <div className="font-semibold">{new Date(featuredEvent.date).toLocaleDateString()}</div>
                        <div className="text-sm">{featuredEvent.time}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-gray-300">
                      <MapPin className="w-5 h-5 text-pink-400" />
                      <div>
                        <div className="font-semibold">{featuredEvent.location}</div>
                        <div className="text-sm">{featuredEvent.virtual ? 'Virtual Event' : 'In-Person'}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {featuredEvent.attendees} attendees
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold">{featuredEvent.price}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredEvent.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300 border border-white/20"
                      >
                        {tag}
                      </span>
              ))}
            </div>
                  
                  <div className="flex gap-4">
                    <motion.button
                      className="inline-flex items-center gap-2 px-6 py-3 bg-purple-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Register Now
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    {featuredEvent.virtual && (
                      <motion.button
                        className="inline-flex items-center gap-2 px-6 py-3 bg-pink-400 text-black font-bold rounded-xl hover:bg-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Play className="w-4 h-4" />
                        Join Virtual
                      </motion.button>
                    )}
            </div>
          </div>
                <div className="relative">
                  <img
                    src={featuredEvent.image}
                    alt={featuredEvent.title}
                    className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-2xl"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {featuredEvent.speakers.length} Speakers
                    </span>
              </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Events Grid */}
      <section className="py-16 bg-black">
        <div className="container-custom">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-12 text-center"
          >
            All Events
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularEvents.map((event, idx) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 shadow-xl border border-white/10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
              >
                <div className="relative mb-6">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-2xl transition-shadow"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full">
                      {event.type}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    {event.virtual ? (
                      <span className="px-3 py-1 bg-pink-400/20 text-pink-400 rounded-full text-xs font-semibold border border-pink-400/30">
                        Virtual
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-purple-400/20 text-purple-400 rounded-full text-xs font-semibold border border-purple-400/30">
                        In-Person
                      </span>
                    )}
                  </div>
                  {event.status === 'past' && (
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-gray-600/80 text-white text-sm font-semibold rounded-full">
                        Past Event
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(event.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {event.time}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-purple-400 transition-colors">
                  {event.title}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {event.attendees}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {event.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-white/10 rounded-full text-xs text-gray-300 border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-white">{event.price}</span>
                  {event.status === 'upcoming' ? (
                    <motion.button
                      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-400 text-black font-bold rounded-lg hover:bg-white transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Register
                      <ArrowRight className="w-3 h-3" />
                    </motion.button>
                  ) : (
                    <span className="text-sm text-gray-400">Event Completed</span>
        )}
      </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;