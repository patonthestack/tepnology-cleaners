import { Box, Grid } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: ' Tepnology Cleaners | Cart',
	description: 'Checkout selected services',
};

export default function Cart() {
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Grid container>
				<Grid size={12}>
					<Box>Cart Page</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
