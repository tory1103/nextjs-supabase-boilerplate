import { NextResponse } from 'next/server';

export default async function proxy() {
	return NextResponse.next();
}

export const config = {
	matcher: '/((?!api|auth/.|_next/static|_next/image|favicon.ico).*)',
};
