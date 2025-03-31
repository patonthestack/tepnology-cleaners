'use client';

import CheckroomIcon from '@mui/icons-material/Checkroom';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
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
	headerLinkXs: {
		mr: 2,
		display: { xs: 'flex', md: 'none' },
		flexGrow: 1,
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

	const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
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
							{PAGES.map((page) => (
								<Link href={page.href} key={page.name}>
									<MenuItem key={page.name}>
										<Typography sx={{ textAlign: 'center' }}>
											{page.name}
										</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<CheckroomIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Link href={'/'}>
						<Typography variant="h5" noWrap sx={styles.headerLinkXs}>
							TEPNOLOGY DRY CLEANERS
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{PAGES.map((page) => (
							<Link href={page.href} key={page.name}>
								<Button
									key={page.name}
									onClick={handleCloseNavMenu}
									sx={styles.navItems}
								>
									{page.name}
								</Button>
							</Link>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						<Link href={'/cart'}>
							<IconButton sx={{ p: 0, color: 'white' }}>
								<ShoppingCartIcon />
							</IconButton>
						</Link>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
