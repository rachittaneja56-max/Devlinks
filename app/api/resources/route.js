import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Resource from '@/models/Resource';

export async function GET() {
  try {
    await connectToDatabase();
    const resources = await Resource.find({}).sort({ createdAt: -1 });
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch resources' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    if (!body.url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }
    
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await connectToDatabase();
    const newResource = await Resource.create(body);
    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}