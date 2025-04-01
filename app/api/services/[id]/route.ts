import { DryCleanItem } from '@/types/dryCleanItem';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'services.json');

const readServices = (): DryCleanItem[] => {
	try {
		const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
		return JSON.parse(jsonData) as DryCleanItem[];
	} catch (error) {
		console.error('Error reading services file:', error);
		return [];
	}
};

const writeServices = (services: DryCleanItem[]) => {
	try {
		fs.writeFileSync(dataFilePath, JSON.stringify(services, null, 2), 'utf-8');
	} catch (error) {
		console.error('Error writing to services file:', error);
	}
};

// GET: Retrieve a service by ID
export async function GET(
	request: Request,
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params;
		const serviceId = parseInt(id, 10);

		if (isNaN(serviceId)) {
			return NextResponse.json(
				{ error: 'Invalid service ID.' },
				{ status: 400 }
			);
		}

		const services = readServices();
		const service = services.find((s) => s.id === serviceId);

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
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params;
		const serviceId = parseInt(id, 10);
		if (isNaN(serviceId)) {
			return NextResponse.json(
				{ error: 'Invalid service ID.' },
				{ status: 400 }
			);
		}

		const updatedService: Partial<DryCleanItem> = await request.json();

		if (updatedService.price !== undefined) {
			if (typeof updatedService.price === 'string') {
				const parsedPrice = parseFloat(updatedService.price);
				if (isNaN(parsedPrice)) {
					return NextResponse.json(
						{ error: 'Invalid price format.' },
						{ status: 400 }
					);
				}
				updatedService.price = parseFloat(parsedPrice.toFixed(2));
			} else if (typeof updatedService.price === 'number') {
				updatedService.price = parseFloat(updatedService.price.toFixed(2));
			}
		}

		const services = readServices();
		const index = services.findIndex((s) => s.id === serviceId);

		if (index === -1) {
			return NextResponse.json(
				{ error: 'Service not found.' },
				{ status: 404 }
			);
		}

		services[index] = { ...services[index], ...updatedService, id: serviceId };

		writeServices(services);

		return NextResponse.json(services[index], { status: 200 });
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
	context: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await context.params;
		const serviceId = parseInt(id, 10);
		if (isNaN(serviceId)) {
			return NextResponse.json(
				{ error: 'Invalid service ID.' },
				{ status: 400 }
			);
		}

		let services = readServices();
		const initialLength = services.length;
		services = services.filter((c) => c.id !== serviceId);

		if (services.length === initialLength) {
			return NextResponse.json(
				{ error: 'Service not found.' },
				{ status: 404 }
			);
		}

		writeServices(services);

		return NextResponse.json(
			{ message: `Service with ID ${serviceId} deleted.` },
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
