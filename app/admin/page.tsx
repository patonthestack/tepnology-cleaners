import { Box, Grid } from '@mui/material';
import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Tepnology Cleaners | Admin',
	description: `Update services provided`,
};

export default function Admin() {
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Grid container>
				<Grid size={12}>
					<Box>Admin Page</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
