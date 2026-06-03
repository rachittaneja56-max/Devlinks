import { connectToDatabase } from '@/lib/db';
import Resource from '@/models/Resource';
import UpvoteButton from '../UpvoteButton'; 

export const revalidate = 60; 

export default async function ResourcesPage({ searchParams }) {
  await connectToDatabase();
  
  const params = await searchParams;
  const q = params?.q || '';
  
  const query = q 
    ? { 
        $or: [
          { title: { $regex: q, $options: 'i' } },
          { description: { $regex: q, $options: 'i' } }
        ]
      }
    : {};

  const resources = await Resource.find(query).sort({ upvotes: -1 });

  return (
    <div className="space-y-6">
      <header className="border-b border-gray-300 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-black">Curated Resources</h1>
        <p className="text-gray-600 mt-2">The most impactful tools and articles, regenerated dynamically (ISR).</p>
      </header>

      <form className="mb-6 flex gap-2" method="GET" action="/resources">
        <input 
          type="text" 
          name="q" 
          defaultValue={q} 
          placeholder="Search resources..." 
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">Search</button>
        {q && <a href="/resources" className="px-4 py-2 bg-gray-200 text-gray-800 rounded flex items-center hover:bg-gray-300">Clear</a>}
      </form>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
            No resources found {q ? `matching "${q}"` : ''}.
          </div>
        ) : (
          resources.map((res) => (
            <div key={res._id.toString()} className="p-6 bg-white border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-shadow flex flex-col justify-between h-full">
              <div className="mb-4">
                <a href={res.url} target="_blank" className="text-xl font-bold text-blue-700 hover:underline hover:text-blue-800 line-clamp-1">{res.title}</a>
                <p className="text-gray-600 mt-2 line-clamp-3">{res.description}</p>
              </div>
              <div className="flex justify-end pt-4 border-t border-gray-100 mt-auto">
                <UpvoteButton id={res._id.toString()} initialUpvotes={res.upvotes} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
