'use client';

import { useCart } from '@/context/cart-context';
import { DryCleanItem } from '@/types/dryCleanItem';
import {
	deleteService,
	updateService,
	uploadImage,
} from '@/utils/servicesFetch';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HideImageIcon from '@mui/icons-material/HideImage';
import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Input,
	InputLabel,
	Modal,
	TextField,
	Typography,
} from '@mui/material';
import { blue, blueGrey, grey, red } from '@mui/material/colors';
import { useRouter } from 'next/navigation';
import { FC, MouseEventHandler, SetStateAction, useState } from 'react';

const styles = {
	editModalContainer: {
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

interface DryCleanCardProps {
	item: DryCleanItem;
	isAdmin?: boolean;
}

interface AddRemoveButtonsProps {
	handleRemove: MouseEventHandler<HTMLButtonElement>;
	handleAdd: MouseEventHandler<HTMLButtonElement>;
	quantity: number;
}

const AddRemoveButtons: FC<AddRemoveButtonsProps> = ({
	handleRemove,
	handleAdd,
	quantity,
}) => {
	return (
		<>
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
		</>
	);
};

interface AdminButtonsProps {
	handleEdit: MouseEventHandler<HTMLButtonElement>;
	handleDelete: MouseEventHandler<HTMLButtonElement>;
	item: DryCleanItem;
}

const AdminButtons: FC<AdminButtonsProps> = ({
	handleEdit,
	handleDelete,
	item,
}) => {
	return (
		<>
			<Box
				sx={{
					borderRadius: 10,
					border: '1px solid',
					borderColor: `${blue[100]}`,
				}}
			>
				<IconButton onClick={handleEdit} sx={{ color: blue[700] }}>
					<EditIcon />
				</IconButton>
				<IconButton onClick={handleDelete} sx={{ color: red[700] }}>
					<DeleteIcon />
				</IconButton>
			</Box>
		</>
	);
};

interface EditModalProps {
	itemToEdit: DryCleanItem;
	modalOpen: boolean;
	setModalOpen: SetStateAction<any>;
}

const EditModal: FC<EditModalProps> = ({
	itemToEdit,
	modalOpen,
	setModalOpen,
}) => {
	const router = useRouter();

	const [updatedItem, setUpdatedItem] = useState<DryCleanItem>(itemToEdit);
	const handleOnChange = (field: any, value: string) => {
		if (field === 'price') {
			const priceValue = parseFloat(value).toFixed(2);
			setUpdatedItem({ ...updatedItem, [field]: priceValue });
			return;
		}
		setUpdatedItem({ ...updatedItem, [field]: value });
	};

	const handleSubmit = async () => {
		await updateService(updatedItem.id, updatedItem).then(() => {
			router.push('/admin');
			router.refresh();
		});
	};

	const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const formData = new FormData();

		await uploadImage(formData, file).then((res) => {
			setUpdatedItem({ ...updatedItem, ['imgSrc']: res.filePath });
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
				sx={styles.editModalContainer}
				component={'form'}
				id={`form-item-${itemToEdit.type}`}
				onSubmit={handleSubmit}
			>
				<Typography id="modal-edit-header" variant="h6" component="h2">
					Edit {itemToEdit.type}
				</Typography>

				<Grid container sx={{ mt: 2 }} spacing={2}>
					<Grid size={6}>
						<InputLabel>Type</InputLabel>
						<TextField
							placeholder="Dress shirt, trousers, etc."
							type="text"
							id="input-type"
							sx={{ mt: 2, width: 250 }}
							defaultValue={itemToEdit.type}
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
							defaultValue={itemToEdit.description}
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
							defaultValue={itemToEdit.price.toFixed(2)}
							onChange={(e) => handleOnChange('price', e.target.value)}
							required
						/>
					</Grid>
					<Grid size={6}>
						<InputLabel>Upload Image</InputLabel>
						<Input type="file" onChange={handleUpload} sx={{ top: 30 }} />
					</Grid>
				</Grid>

				<Box sx={{ ml: 40, mt: 35 }}>
					<Button
						variant="contained"
						onClick={() => setModalOpen(false)}
						sx={{
							width: '40%',
							px: 3,
							mr: 1,
							bgcolor: blueGrey[100],
							color: blueGrey[900],
							':hover': { bgcolor: blue[300], color: 'white' },
						}}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						color="secondary"
						sx={{
							width: '40%',
							ml: 1,
							bgcolor: blue[500],
							':hover': { bgcolor: blue[800] },
						}}
						type="submit"
					>
						Update
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

interface DeleteModalProps {
	modalOpen: boolean;
	setModalOpen: SetStateAction<any>;
	itemToDelete: DryCleanItem;
}

const DeleteModal: FC<DeleteModalProps> = ({
	modalOpen,
	setModalOpen,
	itemToDelete,
}) => {
	const router = useRouter();

	const handleDelete = async () => {
		await deleteService(itemToDelete.id).then(() => {
			setModalOpen(false);
			router.push('/admin');
			router.refresh();
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
				sx={[
					styles.editModalContainer,
					{ textAlign: 'center', height: 200, width: 500 },
				]}
				component={'form'}
				id={`form-item-delete-${itemToDelete.id}`}
			>
				<Typography id="modal-edit-header" variant="h6" component="h2">
					Are you sure you wish to delete {itemToDelete.type}?
				</Typography>
				<Grid container sx={{ mt: 5, justifyContent: 'flex-end' }} spacing={1}>
					<Grid size={3}>
						<Button
							variant="contained"
							onClick={() => setModalOpen(false)}
							sx={{
								width: '40%',
								px: 3,
								bgcolor: blueGrey[100],
								color: blueGrey[900],
								':hover': { bgcolor: blue[300], color: 'white' },
							}}
						>
							Cancel
						</Button>
					</Grid>
					<Grid size={3}>
						<Button
							variant="contained"
							color="secondary"
							sx={{
								width: '40%',
								bgcolor: red[500],
								':hover': { bgcolor: red[800] },
							}}
							type="submit"
							onClick={handleDelete}
						>
							Delete
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Modal>
	);
};

export default function DryCleanCard({
	item,
	isAdmin = false,
}: DryCleanCardProps) {
	const { state, dispatch } = useCart();
	const quantity = state.items[item.id]?.quantity || 0;

	const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
	const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

	const handleAdd = () => {
		dispatch({ type: 'ADD_ITEM', item: { ...item, quantity: quantity } });
	};

	const handleRemove = () => {
		dispatch({ type: 'REMOVE_ITEM', id: item.id });
	};

	const handleAdminEdit = () => {
		setEditModalOpen(!editModalOpen);
	};

	const handleAdminDelete = () => {
		setDeleteModalOpen(!deleteModalOpen);
	};

	return (
		<>
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
					<Typography color="textSecondary">
						${item.price.toFixed(2)}
					</Typography>
					<Typography variant="body2">{item.description}</Typography>
				</CardContent>
				<CardActions
					className="flex justify-between items-center px-4 pb-2"
					sx={{ maxWidth: '300px', justifyContent: 'center' }}
				>
					{isAdmin ? (
						<>
							<AdminButtons
								handleEdit={handleAdminEdit}
								handleDelete={handleAdminDelete}
								item={item}
							/>
							<EditModal
								itemToEdit={item}
								modalOpen={editModalOpen}
								setModalOpen={setEditModalOpen}
							/>
							<DeleteModal
								itemToDelete={item}
								modalOpen={deleteModalOpen}
								setModalOpen={setDeleteModalOpen}
							/>
						</>
					) : (
						<AddRemoveButtons
							handleAdd={handleAdd}
							handleRemove={handleRemove}
							quantity={quantity}
						/>
					)}
				</CardActions>
			</Card>
		</>
	);
}
