import Link from 'next/link';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <nav className="w-full bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
          DevLinks
        </Link>
        <div className="flex gap-6 text-sm font-medium text-gray-600 items-center">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">About</Link>
          <Link href="/add" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm">Submit Link</Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-8">
        {children}
      </main>
    </div>
  );
}