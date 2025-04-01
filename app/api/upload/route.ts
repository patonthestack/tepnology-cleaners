import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
	try {
		const data = await req.formData();
		const file = data.get('image') as File;

		if (!file) {
			return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
		}

		const bytes = await file.arrayBuffer();
		const buffer = Buffer.from(bytes);

		const uploadDir = path.join(process.cwd(), 'public/images');
		if (!fs.existsSync(uploadDir)) {
			fs.mkdirSync(uploadDir, { recursive: true });
		}

		const filePath = path.join(uploadDir, file.name);
		fs.writeFileSync(filePath, buffer);

		return NextResponse.json(
			{ filePath: `/images/${file.name}` },
			{ status: 200 }
		);
	} catch (error) {
		console.error('Error uploading file:', error);
		return NextResponse.json(
			{ error: 'Failed to upload file' },
			{ status: 500 }
		);
	}
}
