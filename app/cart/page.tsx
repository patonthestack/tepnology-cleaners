import { Cart } from '@/components/cart/cart.component';
import { Box } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: ' Tepnology Cleaners | Cart',
	description: 'Checkout selected services',
};

export default function CartPage() {
	return (
		<Box sx={{ width: '100%', p: 4 }}>
			<Cart />
		</Box>
	);
}
