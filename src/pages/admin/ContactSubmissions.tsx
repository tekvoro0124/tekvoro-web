import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Trash2, Mail } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/ui/Button';
import { supabase } from '../../utils/supabaseClient';

interface Submission {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  status: string;
  created_at?: string;
}

const ContactSubmissions = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubmission, setSelectedSubmission] = useState<null | number>(null);
  
  // Fetch submissions from Supabase
  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();

    // Set up realtime subscription
    const channel = supabase
      .channel('contact_submissions_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          console.log('New submission:', payload);
          setSubmissions(prev => [payload.new as Submission, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          console.log('Updated submission:', payload);
          setSubmissions(prev => 
            prev.map(sub => 
              sub.id === payload.new.id ? payload.new as Submission : sub
            )
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'contact_submissions'
        },
        (payload) => {
          console.log('Deleted submission:', payload);
          setSubmissions(prev => 
            prev.filter(sub => sub.id !== payload.old.id)
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = 
      submission.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      submission.subject.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'all' || submission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const getSubmissionById = (id: number) => {
    return submissions.find(sub => sub.id === id);
  };
  
  const selectedSubmissionData = selectedSubmission ? getSubmissionById(selectedSubmission) : null;
  
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-yellow-400"></div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contact Submissions
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search submissions..."
                      className="w-full pl-10 pr-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <select
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="new">New</option>
                      <option value="responded">Responded</option>
                      <option value="archived">Archived</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
                      <Filter className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(100vh-300px)] relative">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <li 
                        key={submission.id}
                        onClick={() => setSelectedSubmission(submission.id)}
                        className={`p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors ${
                          selectedSubmission === submission.id ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                        }`}
                      >
                        <div className="flex justify-between">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {submission.name}
                          </p>
                          <span className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                            submission.status === 'new' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' 
                              : submission.status === 'responded'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {submission.subject}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatDate(submission.created_at || submission.date)}
                          </p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="p-4 text-center text-gray-500 dark:text-gray-400">
                      No submissions found
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow h-full">
              {selectedSubmissionData ? (
                <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedSubmissionData.subject}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        From: {selectedSubmissionData.name} ({selectedSubmissionData.email})
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Received: {formatDate(selectedSubmissionData.date)}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 rounded-md bg-primary-50 text-primary-600 hover:bg-primary-100 dark:bg-primary-900/20 dark:text-primary-400 dark:hover:bg-primary-900/30"
                        aria-label="Reply"
                      >
                        <Mail className="h-5 w-5" />
                      </button>
                      <button
                        className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700/30 rounded-lg p-4 mb-6">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                      {selectedSubmissionData.message}
                    </p>
                  </div>
                  
                  <div className="flex flex-col space-y-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Reply
                    </h3>
                    <textarea
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                      placeholder="Type your reply here..."
                    ></textarea>
                    <div className="flex justify-end">
                      <Button>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-6">
                  <div className="text-center">
                    <Mail className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">
                      No submission selected
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-gray-400">
                      Select a submission from the list to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default ContactSubmissions;