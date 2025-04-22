import clientPromise from '@/lib/mongodb';
import { DryCleanItem } from '@/types/dryCleanItem';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// GET: Retrieve a service by ID
export async function GET(
	request: Request,
	context: { params: Promise<{ _id: ObjectId }> }
) {
	try {
		const client = await clientPromise;
		const db = client.db('tepnologyCleaners');

		const { _id } = await context.params;

		const service = await db.collection('services').findOne({ _id: _id });

		if (!service) {
			return NextResponse.json(
				{ error: 'Service not found.' },
				{ status: 404 }
			);
		}

		return NextResponse.json(service, { status: 200 });
	} catch (error) {
		console.error('Error retrieving service:', error);
		return NextResponse.json(
			{ error: 'Failed to retrieve service.' },
			{ status: 500 }
		);
	}
}

// PUT: Update a service by ID
export async function PUT(
	request: Request,
	context: { params: Promise<{ _id: string }> }
) {
	try {
		const serviceToUpdate: Partial<Omit<DryCleanItem, '_id'>> =
			await request.json();

		const client = await clientPromise;
		const db = client.db('tepnologyCleaners');

		const { _id } = await context.params;
		const objId = new ObjectId(_id);

		//! if _id exists when updating, causes mongoDb error
		if ('_id' in serviceToUpdate) {
			delete serviceToUpdate._id;
		}

		if (serviceToUpdate.price !== undefined) {
			if (typeof serviceToUpdate.price === 'string') {
				const parsedPrice = parseFloat(serviceToUpdate.price);
				if (isNaN(parsedPrice)) {
					return NextResponse.json(
						{ error: 'Invalid price format.' },
						{ status: 400 }
					);
				}
				serviceToUpdate.price = parseFloat(parsedPrice.toFixed(2));
			} else if (typeof serviceToUpdate.price === 'number') {
				serviceToUpdate.price = parseFloat(serviceToUpdate.price.toFixed(2));
			}
		}

		const result = await db
			.collection('services')
			.findOneAndReplace({ _id: objId }, serviceToUpdate);

		if (!result?.value) {
			return NextResponse.json(
				{ error: 'Service not found.' },
				{ status: 404 }
			);
		}

		return NextResponse.json(result, { status: 200 });
	} catch (error) {
		console.error('Error updating service:', error);
		return NextResponse.json(
			{ error: 'Failed to update service.' },
			{ status: 500 }
		);
	}
}

// DELETE: Remove a service by ID
export async function DELETE(
	request: Request,
	context: { params: Promise<{ _id: string }> }
) {
	try {
		const client = await clientPromise;
		const db = client.db('tepnologyCleaners');

		const { _id } = await context.params;
		const objId = new ObjectId(_id);

		await db.collection('services').findOneAndDelete({ _id: objId });

		return NextResponse.json(
			{ message: `Service with ID ${_id} deleted.` },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error deleting service:', error);
		return NextResponse.json(
			{ error: 'Failed to delete service.' },
			{ status: 500 }
		);
	}
}
