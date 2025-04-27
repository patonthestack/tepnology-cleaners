'use client';

import { useCart } from '@/context/cart-context';
import {
	SignInButton,
	SignedIn,
	SignedOut,
	UserButton,
	useUser,
} from '@clerk/nextjs';

import {
	Checkroom as CheckroomIcon,
	Menu as MenuIcon,
	ShoppingCart as ShoppingCartIcon,
} from '@mui/icons-material';
import {
	AppBar,
	Badge,
	Box,
	Button,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from '@mui/material';
import { blue } from '@mui/material/colors';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

const PAGES = [
	{ name: 'Services', href: '/services' },
	{ name: 'Admin', href: '/admin' },
];

const styles = {
	icon: { display: { xs: 'none', md: 'flex' }, mr: 1 },
	headerLinkMd: {
		mr: 2,
		display: { xs: 'none', md: 'flex' },
		fontFamily: 'monospace',
		fontWeight: 700,
		letterSpacing: '.3rem',
		color: 'inherit',
		textDecoration: 'none',
	},
	navItems: {
		my: 2,
		color: 'white',
		display: 'block',
		':hover': {
			backgroundColor: blue[500],
		},
	},
};

export const NavigationBar = () => {
	const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
	const { state } = useCart();
	const { isSignedIn } = useUser();

	const totalQuantity = Object.values(state.items).reduce(
		(total, item) => total + (item.quantity ? item.quantity : 0),
		0
	);

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container
				maxWidth="xl"
				disableGutters
				sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}
			>
				<Toolbar disableGutters sx={{ display: 'flex', width: '100%' }}>
					<CheckroomIcon sx={styles.icon} />
					<Link href={'/'}>
						<Typography variant="h6" noWrap sx={styles.headerLinkMd}>
							TEPNOLOGY DRY CLEANERS
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{PAGES.map((page) => {
								if (page.name === 'Admin') {
									return (
										<SignedIn key={page.name}>
											<Link href={page.href} key={page.name}>
												<MenuItem key={page.name}>
													<Typography sx={{ textAlign: 'center' }}>
														{page.name}
													</Typography>
												</MenuItem>
											</Link>
										</SignedIn>
									);
								}

								return (
									<Link href={page.href} key={page.name}>
										<MenuItem key={page.name}>
											<Typography sx={{ textAlign: 'center' }}>
												{page.name}
											</Typography>
										</MenuItem>
									</Link>
								);
							})}
						</Menu>
						<Link href={'/'}>
							<CheckroomIcon
								sx={{ display: { xs: 'flex', md: 'none' }, mr: 1, mt: 1.5 }}
							/>
						</Link>
					</Box>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{PAGES.map((page) => {
							if (page.name === 'Admin' && !isSignedIn) {
								return null;
							}

							return (
								<Link href={page.href} key={page.name}>
									<Button
										key={page.name}
										onClick={handleCloseNavMenu}
										sx={styles.navItems}
									>
										{page.name}
									</Button>
								</Link>
							);
						})}
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
						<Link href={'/cart'}>
							<IconButton sx={{ p: 0, color: 'white' }}>
								<Badge
									badgeContent={totalQuantity > 0 ? totalQuantity : null}
									color="error"
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
								>
									<ShoppingCartIcon />
								</Badge>
							</IconButton>
						</Link>
						<Box sx={{ mr: { xs: 2, md: 1 } }}>
							<SignedIn>
								<UserButton />
							</SignedIn>
							<SignedOut>
								<Box sx={{ cursor: 'pointer' }}>
									<SignInButton mode="modal" />
								</Box>
							</SignedOut>
						</Box>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
