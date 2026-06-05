import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { validateResourceInput } from '@/lib/resource-validation';
import Resource from '@/models/Resource';

export async function POST(request) {
  try {
    const body = await request.json();
    const result = validateResourceInput(body);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    await connectToDatabase();

    const newResource = new Resource(result.data);
    await newResource.save();

    return NextResponse.json(newResource, { status: 201 });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: 'Request body must be valid JSON' }, { status: 400 });
    }

    console.error('Failed to create resource:', error);
    return NextResponse.json({ error: 'Failed to create resource' }, { status: 500 });
  }
}
