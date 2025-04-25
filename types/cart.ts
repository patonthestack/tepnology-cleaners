import { ObjectId } from 'mongodb';
import { DryCleanItem } from './dryCleanItem';

export interface CartItem extends DryCleanItem {
	quantity: number;
}

export type CartState = {
	items: Array<CartItem>;
};

export type CartAction =
	| { type: 'ADD_ITEM'; item: CartItem }
	| { type: 'REMOVE_ITEM'; _id: ObjectId }
	| { type: 'CLEAR_CART' };
