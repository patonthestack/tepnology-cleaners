import { ObjectId } from 'mongodb';

export interface DryCleanItem {
	_id: ObjectId; //* mongodb id string (mix of numbers and chars)
	type: string;
	description: string;
	price: number;
	imgSrc?: string;
}
