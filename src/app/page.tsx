'use server';

import { connection } from 'next/server';
import { usersReadAllAction } from '@/actions';

const ServerPage = async () => {
	await connection();

	const users = await usersReadAllAction();

	return (
		<main>
			<h1>{JSON.stringify(users)}</h1>
		</main>
	);
};

export default ServerPage;
