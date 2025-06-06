import DryCleanCard from '@/components/services/drycleancard.component';
import { DryCleanItem } from '@/types/dryCleanItem';
import { getServices } from '@/utils/servicesFetch';
import { Box, Grid } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import type { Metadata } from 'next';
import { FC } from 'react';

export const metadata: Metadata = {
	title: 'Tepnology Cleaners | Services',
	description: `Select services you'd wish to recieve`,
};

const Services: FC = async () => {
	let isLoading = true;

	const services: DryCleanItem[] = await getServices().then((servicesData) => {
		isLoading = false;
		return servicesData;
	});

	return (
		<Box sx={{ width: '100%', height: '100%', my: 2 }}>
			{isLoading ? (
				<LinearProgress />
			) : (
				<Grid container spacing={3}>
					{services.length === 0 ? (
						<Grid size={12} sx={{ p: 2 }}>
							No Services Available
						</Grid>
					) : (
						services.map((item) => (
							<Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item._id?.toString()}>
								<DryCleanCard item={item} />
							</Grid>
						))
					)}
				</Grid>
			)}
		</Box>
	);
};

export default Services;
