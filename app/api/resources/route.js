import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Resource from '@/models/Resource';

export async function GET() {
  try {
    await connectToDatabase();
    const resources = await Resource.find({}).sort({ upvotes: -1 });
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch resources:', error);
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.title || !body.url) {
      return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 });
    }

    await connectToDatabase();
    
    const newResource = new Resource(body);
    await newResource.save();
    
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    console.error('Failed to create resource:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}