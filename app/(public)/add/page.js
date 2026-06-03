'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddResourcePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', url: '', description: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to add resource');
      }

      toast.success('Resource submitted successfully!');
      router.push('/resources');
      router.refresh();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
      <header className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black">Submit a Resource</h1>
        <p className="text-gray-600 mt-2">Share a helpful tool, article, or repository with the community.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input 
            type="text" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
          <input 
            type="url" 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.url}
            onChange={(e) => setFormData({...formData, url: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            required 
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>
        </div>
        <button 
          type="submit" 
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Resource'}
        </button>
      </form>
    </div>
  );
}
