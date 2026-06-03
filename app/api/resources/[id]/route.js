import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Resource from '@/models/Resource';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await connectToDatabase();
    
    const deletedResource = await Resource.findByIdAndDelete(id);
    if (!deletedResource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    
    await connectToDatabase();
    
    const updatedResource = await Resource.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!updatedResource) {
      return NextResponse.json({ error: 'Resource not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedResource, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update resource' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  return PUT(request, { params });
}