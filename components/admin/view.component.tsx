'use client';

import { DryCleanItem } from '@/types/dryCleanItem';
import { createService, getServices, uploadImage } from '@/utils/servicesFetch';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {
	Box,
	Button,
	Card,
	Grid,
	IconButton,
	Input,
	InputLabel,
	Modal,
	TextField,
	Typography,
} from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { blue, blueGrey, grey } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import {
	Dispatch,
	FC,
	ReactElement,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import DryCleanCard from '../services/drycleancard.component';

const styles = {
	createModalContainer: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 600,
		height: 650,
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
		borderRadius: 2,
		outline: 'none',
	},
};

interface CreateModalProps {
	modalOpen: boolean;
	setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CreateModal: FC<CreateModalProps> = ({ modalOpen, setModalOpen }) => {
	const router = useRouter();

	const initState = { type: '', description: '', price: 0 };
	const [newItem, setNewItem] = useState<Partial<DryCleanItem>>(initState);
	const handleOnChange = (field: any, value: string) => {
		if (field === 'price') {
			const priceValue = parseFloat(value).toFixed(2);
			setNewItem({ ...newItem, [field]: priceValue });
			return;
		}
		setNewItem({ ...newItem, [field]: value });
	};

	const handleSubmit = async () => {
		await createService(newItem).then(() => {
			router.push('/admin');
			router.refresh();
		});
	};

	const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const formData = new FormData();

		await uploadImage(formData, file).then((res) => {
			setNewItem({ ...newItem, ['imgSrc']: res.filePath });
		});
	};

	return (
		<Modal
			open={modalOpen}
			onClose={() => setModalOpen(false)}
			sx={{
				top: '20%',
				left: '25%',
				maxWidth: '50%',
				height: '50%',
			}}
		>
			<Box
				sx={styles.createModalContainer}
				component={'form'}
				id={`form-new-item`}
				onSubmit={handleSubmit}
			>
				<Typography id="modal-edit-header" variant="h6" component="h2">
					Add a New Service
				</Typography>

				<Grid container sx={{ mt: 2 }} spacing={2}>
					<Grid size={6}>
						<InputLabel>Type</InputLabel>
						<TextField
							placeholder="Dress shirt, trousers, etc."
							type="text"
							id="input-type"
							sx={{ mt: 2, width: 250 }}
							onChange={(e) => handleOnChange('type', e.target.value)}
							required
						/>
					</Grid>
					<Grid size={6}>
						<InputLabel>Description</InputLabel>
						<TextField
							placeholder="Description of the service"
							type="text"
							id="input-description"
							sx={{ mt: 2, width: 250 }}
							onChange={(e) => handleOnChange('description', e.target.value)}
							required
						/>
					</Grid>
					<Grid size={6}>
						<InputLabel>Price</InputLabel>
						<TextField
							placeholder="Price of the service"
							type="number"
							slotProps={{ htmlInput: { step: '0.01' } }}
							id="input-price"
							sx={{ mt: 2, width: 250 }}
							onChange={(e) => handleOnChange('price', e.target.value)}
							required
						/>
					</Grid>
					<Grid size={6}>
						<InputLabel>Upload Image</InputLabel>
						<Input type="file" onChange={handleUpload} sx={{ top: 30 }} />
					</Grid>
				</Grid>
				<Grid container justifyContent={'flex-end'} sx={{ mt: 35 }}>
					<Grid size={4}>
						<Button
							variant="contained"
							onClick={() => setModalOpen(false)}
							sx={{
								px: 3,
								width: '90%',
								bgcolor: blueGrey[100],
								color: blueGrey[900],
								':hover': { bgcolor: blue[300], color: 'white' },
							}}
						>
							Cancel
						</Button>
					</Grid>
					<Grid size={4}>
						<Button
							variant="contained"
							color="secondary"
							sx={{
								px: 3,
								width: '90%',
								bgcolor: blue[500],
								':hover': { bgcolor: blue[800] },
							}}
							type="submit"
						>
							Add Service
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
};

export default function AdminView(): ReactElement {
	const [services, setServices] = useState<DryCleanItem[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);

	useEffect(() => {
		const fetchServices = async () => {
			await getServices().then((servicesData) => {
				setServices(servicesData);
				setIsLoading(false);
			});
		};

		fetchServices();
	}, []);

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
						services.map((service) => (
							<Grid
								size={{ xs: 12, sm: 6, lg: 4 }}
								key={service._id?.toString()}
							>
								<DryCleanCard item={service} isAdmin={true} />
							</Grid>
						))
					)}
					<Grid size={{ xs: 12, sm: 6, lg: 4 }}>
						<Card
							sx={{
								maxWidth: 300,
								height: 400,
								mx: 'auto',
								textAlign: 'center',
								alignContent: 'center',
								alignItems: 'center',
								p: 2,
								boxShadow: `10px 5px 5px ${grey[500]}`,
								background: 'transparent',
								border: `1px solid ${blueGrey[300]}`,
							}}
						>
							<Box
								sx={{
									height: 150,
									width: 'auto',
									objectFit: 'contain',
									display: 'block',
									alignContent: 'center',
								}}
							>
								<IconButton
									sx={{
										color: blueGrey[500],
									}}
									onClick={() => setCreateModalOpen(!createModalOpen)}
								>
									<AddCircleOutlineOutlinedIcon fontSize="large" />
								</IconButton>
							</Box>
						</Card>
					</Grid>
				</Grid>
			)}
			<CreateModal
				modalOpen={createModalOpen}
				setModalOpen={setCreateModalOpen}
			/>
		</Box>
	);
}
