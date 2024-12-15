import {
	NextRequest,
	NextResponse
}                                 from 'next/server';

import { createSupabaseSVClient } from '@/lib/supabase/server';


export default async function middleware( request: NextRequest )
{
	const url = request.nextUrl.clone();
	const
		{ auth }           = await createSupabaseSVClient(),
		{ data: { user } } = await auth.getUser();

	if ( !user ) url.pathname = '/auth/signin';

	if ( request.nextUrl.pathname !== url.pathname )
	{
		url.searchParams.append( 'redirect', request.nextUrl.href );
		return NextResponse.redirect( url );
	}

	return NextResponse.next();
}

export const config = {
	matcher: '/((?!api|auth/.|_next/static|_next/image|favicon.ico).*)'
};