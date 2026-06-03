'use client'
import { useTransition, useState } from 'react';
import { upvoteResource } from '@/actions/upvoteaction'

export default function UpvoteButton({ id, initialUpvotes }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticUpvotes, setOptimisticUpvotes] = useState(initialUpvotes);

  const handleUpvote = () => {
    setOptimisticUpvotes(prev => prev + 1);
    startTransition(async () => {
      await upvoteResource(id); 
    });
  };

  return (
    <button 
      onClick={handleUpvote}
      disabled={isPending}
      className="flex items-center gap-2 px-3 py-1.5 bg-gray-200 border border-gray-300 rounded text-black hover:bg-gray-300 disabled:opacity-50 font-medium"
    >
      <span>▲</span>
      <span>{optimisticUpvotes}</span>
    </button>
  );
}