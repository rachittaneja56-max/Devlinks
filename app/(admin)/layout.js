import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-50 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-300 flex flex-col">
        <div className="p-6 border-b border-gray-300">
          <Link href="/" className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
            DevLinks
            <span className="ml-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link href="/admin" className="px-4 py-2 rounded-md bg-blue-50 text-blue-700 font-medium">Dashboard</Link>
          <Link href="/" className="px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 font-medium mt-auto transition-colors">View Site</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
