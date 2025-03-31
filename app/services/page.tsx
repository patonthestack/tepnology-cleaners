import DryCleanCard from '@/components/drycleancard.component';
import { DryCleanItem } from '@/types/dryCleanItem';
import { Box, Grid } from '@mui/material';
import type { Metadata } from 'next';
import { FC } from 'react';
import { BASE_URL } from '../config/constants';

export const metadata: Metadata = {
	title: 'Tepnology Cleaners | Services',
	description: `Select services you'd wish to recieve`,
};

async function getServices(): Promise<DryCleanItem[]> {
	try {
		const res = await fetch(`${BASE_URL}/api/services`, {
			cache: 'no-store',
		});

		if (!res.ok) {
			console.error('API response error:', await res.text());
			throw new Error(`Failed to fetch services: ${res.status}`);
		}

		return res.json();
	} catch (err) {
		console.error('Error fetching services:', err);
		return [];
	}
}

const Services: FC = async () => {
	const services = await getServices();

	return (
		<Box sx={{ width: '100%', height: '100%', my: 2 }}>
			<Grid container spacing={3}>
				{services.length === 0 ? (
					<Grid size={12} sx={{ p: 2 }}>
						No Services Available
					</Grid>
				) : (
					services.map((item) => (
						<Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.id}>
							<DryCleanCard item={item} />
						</Grid>
					))
				)}
			</Grid>
		</Box>
	);
};

export default Services;
