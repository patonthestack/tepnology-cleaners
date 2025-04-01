import { CartItem } from '@/types/cart';
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'cart.json');

const readCart = (): CartItem[] => {
	try {
		const jsonData = fs.readFileSync(dataFilePath, 'utf-8');
		return JSON.parse(jsonData) as CartItem[];
	} catch (error) {
		console.error('Error reading cart file:', error);
		return [];
	}
};

const writeServices = (cartItems: CartItem[]) => {
	try {
		fs.writeFileSync(dataFilePath, JSON.stringify(cartItems, null, 2), 'utf-8');
	} catch (error) {
		console.error('Error writing to cart file:', error);
	}
};

// GET: Retrieve all cart items
export async function GET() {
	try {
		const cart = readCart();
		return NextResponse.json(cart, { status: 200 });
	} catch (error) {
		console.error('Error retrieving cart items:', error);
		return NextResponse.json(
			{ error: 'Failed to retrieve cart items.' },
			{ status: 500 }
		);
	}
}

// POST: Add a new cart item
export async function POST(request: Request) {
	try {
		const newCartItem: CartItem = await request.json();
		const cartItems = readCart();

		const existingItemIndex = cartItems.findIndex(
			(item) => item.id === newCartItem.id
		);

		if (existingItemIndex !== -1) {
			cartItems[existingItemIndex].quantity += newCartItem.quantity;
		} else {
			newCartItem.id = cartItems.length
				? cartItems[cartItems.length - 1].id + 1
				: 1;
			cartItems.push(newCartItem);
		}

		writeServices(cartItems);

		return NextResponse.json(newCartItem, { status: 201 });
	} catch (error) {
		console.error('Error adding item to cart:', error);
		return NextResponse.json(
			{ error: 'Failed to add item to cart.' },
			{ status: 500 }
		);
	}
}
