import { NavigationBar } from '@/components/common/navigation.component';
import { CartProvider } from '@/context/cart-context';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Tepnology Cleaners',
	description: 'We provide all your dry cleaning needs',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider>
			<CartProvider>
				<html lang="en">
					<body
						className={`${geistSans.variable} ${geistMono.variable} antialiased`}
					>
						<NavigationBar />
						{children}
					</body>
				</html>
			</CartProvider>
		</ClerkProvider>
	);
}
