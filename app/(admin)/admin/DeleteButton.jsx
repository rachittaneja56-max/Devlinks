'use client';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DeleteButton({ id }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this resource?')) return;
    
    startTransition(async () => {
      try {
        const res = await fetch(`/api/resources/${id}`, {
          method: 'DELETE',
        });
        
        if (!res.ok) {
          throw new Error('Failed to delete resource');
        }
        toast.success('Resource deleted!');
        router.refresh();
      } catch (error) {
        toast.error('Failed to delete resource');
        console.error(error);
      }
    });
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={isPending}
      className="inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium bg-white text-red-600 border border-red-200 rounded-md hover:bg-red-50 hover:border-red-300 transition-colors disabled:opacity-50 shadow-sm"
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
}