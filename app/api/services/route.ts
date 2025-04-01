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

// GET: Retrieve all services
export async function GET() {
	try {
		const services = readServices();
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
	try {
		const newService: DryCleanItem = await request.json();

		if (newService.price !== undefined) {
			if (typeof newService.price === 'string') {
				const parsedPrice = parseFloat(newService.price);
				if (isNaN(parsedPrice)) {
					return NextResponse.json(
						{ error: 'Invalid price format.' },
						{ status: 400 }
					);
				}
				newService.price = parseFloat(parsedPrice.toFixed(2));
			} else if (typeof newService.price === 'number') {
				newService.price = parseFloat(newService.price.toFixed(2));
			}
		}

		const services = readServices();

		newService.id = services.length ? services[services.length - 1].id + 1 : 1;
		services.push(newService);
		writeServices(services);

		return NextResponse.json(newService, { status: 201 });
	} catch (error) {
		console.error('Error adding course:', error);
		return NextResponse.json(
			{ error: 'Failed to add course.' },
			{ status: 500 }
		);
	}
}
