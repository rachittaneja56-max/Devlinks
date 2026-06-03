import { connectToDatabase } from '@/lib/db';
import Resource from '@/models/Resource';
import DeleteButton from './DeleteButton';

// Forces this page to render on every single request
export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  await connectToDatabase();
  
  // .lean() converts Mongoose docs to plain JS objects, 
  // which is required before passing them to Client Components.
  const resources = await Resource.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-6xl mx-auto space-y-6 mt-8">
      <header className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black tracking-tight">
          Admin Operations <span className="text-blue-600 font-semibold text-lg ml-2">(SSR)</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Data fetched on every request directly from MongoDB without caching.
        </p>
      </header>

      <div className="bg-white border border-gray-300 rounded-md overflow-hidden">
        <div className="p-4 border-b border-gray-300 bg-gray-50">
          <h2 className="text-lg font-bold text-black">Live Database Records</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-600 uppercase text-xs font-semibold border-b border-gray-300">
              <tr>
                <th scope="col" className="px-6 py-4">Title</th>
                <th scope="col" className="px-6 py-4">URL</th>
                <th scope="col" className="px-6 py-4 text-center">Upvotes</th>
                <th scope="col" className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {resources.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500 italic">
                    No resources found in database.
                  </td>
                </tr>
              ) : (
                resources.map(item => (
                  <tr key={item._id.toString()} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-black whitespace-nowrap">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-gray-600">
                      <a href={item.url} target="_blank" className="hover:text-blue-600 hover:underline">{item.url}</a>
                    </td>
                    <td className="px-6 py-4 text-center font-mono">
                      <span className="bg-gray-200 text-black px-2 py-1 rounded text-xs font-bold">
                        {item.upvotes || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <DeleteButton id={item._id.toString()} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}