import { useEffect, useState } from 'react';
import { supabase } from '../../utils/supabaseClient';
import Navbar from '../../components/layout/Navbar';

export default function BlogSubscribersAdmin() {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function fetchSubscribers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('blog_subscribers')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setSubscribers(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchSubscribers();
  }, []);

  async function addSubscriber(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email) return;
    const { error } = await supabase
      .from('blog_subscribers')
      .insert([{ email }]);
    if (error) {
      setError(error.message);
    } else {
      setSuccess('Subscriber added!');
      setEmail('');
      fetchSubscribers();
    }
  }

  async function deleteSubscriber(id: string) {
    await supabase.from('blog_subscribers').delete().eq('id', id);
    fetchSubscribers();
  }

  return (
    <>
      <Navbar />
      <div className="bg-white/5 rounded-2xl p-6 mb-10 border border-white/10 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Blog Subscribers</h2>
        <form onSubmit={addSubscriber} className="flex gap-2 mb-4">
          <input
            type="email"
            placeholder="Add subscriber email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50"
            required
          />
          <button type="submit" className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold">Add</button>
        </form>
        {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
        {success && <div className="text-green-400 text-sm mb-2">{success}</div>}
        {loading ? (
          <div className="text-gray-400">Loading...</div>
        ) : (
          <ul className="divide-y divide-white/10">
            {subscribers.map((s) => (
              <li key={s.id} className="flex items-center justify-between py-2 text-white">
                <span>{s.email}</span>
                <button
                  onClick={() => deleteSubscriber(s.id)}
                  className="text-red-400 hover:text-red-200 text-xs px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
} 