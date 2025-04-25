'use client';

import { useCart } from '@/context/cart-context';
import { useUser } from '@clerk/nextjs';
import {
	Grid,
	Typography,
	List,
	ListItem,
	ListItemText,
	Card,
	CardContent,
	Divider,
	Box,
	Button,
} from '@mui/material';

export const Cart = () => {
	const { isSignedIn } = useUser();
	const { state } = useCart();
	const cartItems = state.items;

	const getTotalItems = () =>
		cartItems
			.reduce((acc, item) => acc + item.price * item.quantity, 0)
			.toFixed(2);
	return (
		<Grid container spacing={4}>
			<Grid size={{ xs: 12, md: 8 }}>
				<Typography variant="h4" gutterBottom>
					Your Cart
				</Typography>
				{cartItems.length === 0 ? (
					<Typography variant="body1">Your cart is empty.</Typography>
				) : (
					<List>
						{cartItems.map((item) => (
							<ListItem key={item._id.toString()} sx={{ px: 0 }}>
								<ListItemText
									primary={item.type}
									secondary={`$${(item.price * item.quantity).toFixed(2)}`}
								/>
							</ListItem>
						))}
					</List>
				)}
			</Grid>

			<Grid size={{ xs: 12, md: 4 }}>
				<Card sx={{ p: 2 }}>
					<CardContent>
						<Typography variant="h6">Order Summary</Typography>
						<Divider sx={{ my: 2 }} />
						<Box display="flex" justifyContent="space-between" mb={1}>
							<Typography>Subtotal</Typography>
							<Typography>${getTotalItems()}</Typography>
						</Box>
						<Box display="flex" justifyContent="space-between" mb={3}>
							<Typography>Total</Typography>
							<Typography fontWeight="bold">${getTotalItems()}</Typography>
						</Box>

						{isSignedIn ? (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								onClick={() =>
									window.alert(
										'This should navigate to checkout page with user info'
									)
								}
							>
								Proceed to Checkout
							</Button>
						) : (
							<Button
								variant="contained"
								color="primary"
								fullWidth
								onClick={() =>
									window.alert('This should navigate to a guest checkout page')
								}
							>
								Checkout as Guest
							</Button>
						)}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};
