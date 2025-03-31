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

// const writeServices = (courses: DryCleanItem[]) => {
//   try {
//     fs.writeFileSync(dataFilePath, JSON.stringify(courses, null, 2), "utf-8");
//   } catch (error) {
//     console.error("Error writing to services file:", error);
//   }
// };

// GET: Retrieve all services
export async function GET() {
	try {
		const courses = readServices();
		return NextResponse.json(courses, { status: 200 });
	} catch (error) {
		console.error('Error retrieving services:', error);
		return NextResponse.json(
			{ error: 'Failed to retrieve services.' },
			{ status: 500 }
		);
	}
}

// POST: Add a new service
// export async function POST(request: Request) {
//   try {
//     const newService: DryCleanItem = await request.json();
//     const services = readCourses();

//     newService.id = service.length ? service[service.length - 1].id + 1 : 1;
//     service.push(newCourse);
//     writeServices(services);

//     return NextResponse.json(newService, { status: 201 });
//   } catch (error) {
//     console.error("Error adding service:", error);
//     return NextResponse.json(
//       { error: "Failed to add service." },
//       { status: 500 }
//     );
//   }
// }
