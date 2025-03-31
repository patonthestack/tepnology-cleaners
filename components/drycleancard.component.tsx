'use client';

import { useCart } from '@/context/cart-context';
import { DryCleanItem } from '@/types/dryCleanItem';
import HideImageIcon from '@mui/icons-material/HideImage';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import { blue, grey } from '@mui/material/colors';

interface DryCleanCardProps {
	item: DryCleanItem;
}

export default function DryCleanCard({ item }: DryCleanCardProps) {
	const { state, dispatch } = useCart();
	const quantity = state.items[item.id]?.quantity || 0;

	const handleAdd = () => {
		dispatch({ type: 'ADD_ITEM', item: { ...item, quantity: quantity } });
	};

	const handleRemove = () => {
		// if (quantity > 0) {
		dispatch({ type: 'REMOVE_ITEM', id: item.id });
		// }
	};

	console.log(`state: ${JSON.stringify(state)}`);

	return (
		<Card
			sx={{
				maxWidth: 300,
				height: 400,
				mx: 'auto',
				textAlign: 'center',
				p: 2,
				boxShadow: `5px 3px 5px ${grey[500]}`,
			}}
		>
			{item.imgSrc ? (
				<CardMedia
					component={'img'}
					image={item.imgSrc}
					alt={item.type}
					height="10"
					sx={{
						height: 150,
						width: 100,
						objectFit: 'contain',
						display: 'block',
						mx: 'auto',
					}}
				/>
			) : (
				<Box
					sx={{
						height: 150,
						width: 'auto',
						objectFit: 'contain',
						display: 'block',
						alignContent: 'center',
					}}
				>
					<HideImageIcon sx={{ height: 100, width: 150 }} />
				</Box>
			)}
			<CardContent>
				<Typography>{item.type}</Typography>
				<Typography color="textSecondary">${item.price.toFixed(2)}</Typography>
				<Typography variant="body2">{item.description}</Typography>
			</CardContent>
			<CardActions
				className="flex justify-between items-center px-4 pb-2"
				sx={{ maxWidth: '300px' }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleRemove}
					disabled={quantity === 0}
				>
					-
				</Button>
				<Typography>{quantity}</Typography>
				<Button
					variant="contained"
					color="primary"
					sx={{ ':hover': { background: `${blue[500]}` } }}
					onClick={handleAdd}
				>
					+
				</Button>
			</CardActions>
		</Card>
	);
}
