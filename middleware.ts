import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher(['/admin']);

export default clerkMiddleware(async (auth, req) => {
	console.log(`Accessing route: ${req.url}`);
	if (isProtectedRoute(req)) {
		console.log('Protected route detected, applying auth.protect()');
		await auth.protect();
	} else {
		console.log('Non-protected route, no auth needed');
	}
});

export const config = {
	matcher: [
		// Skip Next.js internals and all static files, unless found in search params
		'/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
		// Always run for API routes
		'/(api|trpc)(.*)',
	],
};
