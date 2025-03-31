import { DryCleanItem } from './dryCleanItem';

export interface CartItem extends DryCleanItem {
	quantity: number;
}

export type CartState = {
	items: Record<number, CartItem>;
};

export type CartAction =
	| { type: 'ADD_ITEM'; item: CartItem }
	| { type: 'REMOVE_ITEM'; id: number }
	| { type: 'CLEAR_CART' };
