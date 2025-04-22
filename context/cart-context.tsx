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
			const existingItemIdx = state.items.findIndex(
				(item) => item._id?.toString() === action.item._id.toString()
			);
			if (existingItemIdx !== -1) {
				const updatedItems = [...state.items];
				updatedItems[existingItemIdx] = {
					...updatedItems[existingItemIdx],
					quantity: updatedItems[existingItemIdx]?.quantity
						? updatedItems[existingItemIdx]?.quantity + 1
						: 1,
				};

				return {
					...state,
					items: updatedItems,
				};
			} else {
				return {
					...state,
					items: [...state.items, { ...action.item, quantity: 1 }],
				};
			}
		}
		case 'REMOVE_ITEM': {
			const existingItemIdx = state.items.findIndex(
				(item) => item._id?.toString() === action._id.toString()
			);

			if (existingItemIdx !== -1) {
				const existingItem = state.items[existingItemIdx];

				if (existingItem?.quantity) {
					if (existingItem.quantity === 1) {
						return {
							...state,
							items: state.items.filter((item, idx) => idx !== existingItemIdx),
						};
					} else if (existingItem.quantity > 1) {
						const updatedItems = [...state.items];
						updatedItems[existingItemIdx] = {
							...existingItem,
							quantity: existingItem.quantity - 1,
						};

						return {
							...state,
							items: updatedItems,
						};
					}
				}
			}

			return state;
		}

		case 'CLEAR_CART':
			return { items: [] };
		default:
			return state;
	}
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(cartReducer, { items: [] });

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
