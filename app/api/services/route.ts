import { DryCleanItem } from '@/types/dryCleanItem';
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { auth } from '@clerk/nextjs/server';

// GET: Retrieve all services
export async function GET() {
	try {
		const client = await clientPromise;
		const db = client.db('tepnologyCleaners');
		const services = await db.collection('services').find({}).toArray();
		return NextResponse.json(services, { status: 200 });
	} catch (error) {
		console.error('Error retrieving services:', error);
		return NextResponse.json(
			{ error: 'Failed to retrieve services.' },
			{ status: 500 }
		);
	}
}

// POST: Add a new service
export async function POST(request: Request) {
	const { userId } = await auth();

	if (!userId) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const serviceToAdd: Omit<DryCleanItem, '_id'> = await request.json();
		const client = await clientPromise;
		const db = client.db('tepnologyCleaners');

		if (serviceToAdd.price !== undefined) {
			if (typeof serviceToAdd.price === 'string') {
				const parsedPrice = parseFloat(serviceToAdd.price);
				if (isNaN(parsedPrice)) {
					return NextResponse.json(
						{ error: 'Invalid price format.' },
						{ status: 400 }
					);
				}
				serviceToAdd.price = parseFloat(parsedPrice.toFixed(2));
			} else if (typeof serviceToAdd.price === 'number') {
				serviceToAdd.price = parseFloat(serviceToAdd.price.toFixed(2));
			}
		}

		const result = await db.collection('services').insertOne(serviceToAdd);

		if (!result.acknowledged) {
			throw new Error('Failed to insert service');
		}

		return NextResponse.json(result, { status: 201 });
	} catch (error) {
		console.error('Error adding service:', error);
		return NextResponse.json(
			{ error: 'Failed to add service.' },
			{ status: 500 }
		);
	}
}
