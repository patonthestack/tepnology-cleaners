'use client';

import { CartAction, CartState } from '@/types/cart';
import { createContext, ReactNode, useContext, useReducer } from 'react';

const CartContext = createContext<{
	state: CartState;
	dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
	switch (action.type) {
		case 'ADD_ITEM': {
			const existingItem = state.items[action.item.id];
			return {
				...state,
				items: {
					...state.items,
					[action.item.id]: {
						...action.item,
						quantity: existingItem ? existingItem.quantity + 1 : 1,
					},
				},
			};
		}
		case 'REMOVE_ITEM': {
			console.log(`action.id: ${action.id}`);
			const existingItem = state.items[action.id];
			console.log(`existingItem: ${JSON.stringify(existingItem)}`);
			if (existingItem) {
				if (existingItem.quantity === 0) {
					delete state.items[existingItem.id];
				} else {
					return {
						...state,
						items: {
							...state.items,
							[action.id]: {
								...existingItem,
								quantity: existingItem.quantity - 1,
							},
						},
					};
				}
			}
		}
		case 'CLEAR_CART':
			return { items: {} };
		default:
			return state;
	}
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, { items: {} });

	return (
		<CartContext.Provider value={{ state, dispatch }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) throw new Error('useCart must be used within a CartProvider');
	return context;
};
