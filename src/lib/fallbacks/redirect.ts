'use server';

import { redirect } from 'next/navigation';

export const fallbackRedirect = async (path = '/') => {
	return redirect(path);
};
