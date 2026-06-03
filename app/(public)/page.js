import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
      <h1 className="text-5xl font-extrabold text-black">Welcome to DevLinks</h1>
      <p className="text-xl text-gray-700 max-w-2xl">
        A centralized hub to discover, share, and upvote the most impactful engineering articles, tools, and repositories across the web.
      </p>
      <Link href="/resources" className="px-6 py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition-colors">
        Browse Resources
      </Link>
    </div>
  );
}