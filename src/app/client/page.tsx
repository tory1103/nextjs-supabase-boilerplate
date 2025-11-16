'use client';

import { useMutation, useQuery } from '@tanstack/react-query';
import { signupWithEmailAction, usersReadAllAction } from '@/actions';
import { QKEYS_USERS } from '@/lib/queryClient';

const queryKey = QKEYS_USERS.get('readAll');

const ClientPage = () => {
	const { data: users, isLoading } = useQuery({
		queryKey,
		queryFn: () => usersReadAllAction(),
	});

	const { mutate, data, error, isPending } = useMutation({
		mutationFn: signupWithEmailAction,
	});

	if (isLoading || isPending) {
		return <p>Loading...</p>;
	}

	return (
		<main>
			<h1>USERS: {JSON.stringify(users)}</h1>
			<br />

			{<p>DATA: {JSON.stringify(data || null)}</p>}
			<br />

			{<p>ERROR: {JSON.stringify(error || null)}</p>}
			<br />

			<div className='flex flex-row justify-evenly w-screen p-4'>
				<button
					onClick={() =>
						mutate({
							email: `${Date.now()}@marketmind.es`,
							password: 'Password@12345',
							repeatPassword: 'Password@12345',
						})
					}
					type='button'
				>
					Valid signup
				</button>

				<button
					onClick={() =>
						mutate({
							email: `${Date.now()}@marketmind.es`,
							password: 'password',
							repeatPassword: 'password1',
						})
					}
					type='button'
				>
					Error signup
				</button>
			</div>
		</main>
	);
};

export default ClientPage;
