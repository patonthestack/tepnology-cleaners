import { Box, Button, Grid, Typography } from '@mui/material';
import { blue, blueGrey, grey } from '@mui/material/colors';
import type { Metadata } from 'next';
import Link from 'next/link';
import { FC } from 'react';

export const metadata: Metadata = {
	title: ' Tepnology Cleaners | Home',
	description:
		'Welcome to Tepnology Dry Cleaners, we deliver your dry cleaning right to your door!',
};

const styles = {
	container: {
		textAlign: 'center',
		alignContent: 'center',
		height: '50vh',
		padding: 5,
		fontFamily: 'Geist Arial Helvetica',
	},
	headingText: {
		fontWeight: 'bold',
		color: `${blue[600]}`,
		textShadow: `4px 3px 3px ${grey[500]}`,
	},
	button: {
		border: `1px solid ${blue[800]}`,
		borderRadius: '4px',
		background: blue[700],
		boxShadow: `10px 5px 5px ${blueGrey[600]}`,
		color: 'white',
		'&:hover': {
			background: blue[500],
		},
	},
};

const Home: FC = () => {
	return (
		<Box sx={{ width: '100%', height: '100%' }}>
			<Grid container sx={styles.container} rowSpacing={2}>
				<Grid size={12}>
					<Typography variant="h2" sx={styles.headingText}>
						Welcome to Tepnology Dry Cleaners
					</Typography>
				</Grid>
				<Grid size={12}>
					<Typography variant="h4" sx={{ fontStyle: 'italic' }}>
						We deliver straight to your door!
					</Typography>
				</Grid>
				<Grid size={12}>
					<Link href={'/services'}>
						<Button sx={styles.button}>View Services</Button>
					</Link>
				</Grid>
			</Grid>
		</Box>
	);
};

export default Home;
