import { Box, Grid } from '@mui/material';
import type { Metadata } from 'next';
import AdminView from '@/components/admin/view.component';

export const metadata: Metadata = {
	title: 'Tepnology Cleaners | Admin',
	description: `Update services provided`,
};

export default function Admin() {
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Grid container>
				<Grid size={12}>
					<AdminView />
				</Grid>
			</Grid>
		</Box>
	);
}
