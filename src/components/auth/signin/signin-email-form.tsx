'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signinWithEmailAction } from '@/actions/auth/signin';
import { type SigninWithEmail } from '@/actions/auth/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { SigninWithEmailSchema } from '@/zod-schemas/auth/signin';

export default function SigninEmailForm() {
	const { toast } = useToast();
	const { control, handleSubmit, ...form } = useForm<SigninWithEmail>({
		resolver: zodResolver(SigninWithEmailSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onSubmit({ email, password }: SigninWithEmail) {
		setIsLoading(true);
		const action = await signinWithEmailAction({ email, password });
		setIsLoading(false);

		if (!action.success) {
			return toast({
				description: action.error.message,
				variant: 'destructive',
			});
		}

		toast({
			description: 'You have successfully signed in',
		});

		redirect('/');
	}

	return (
		<div className='w-full'>
			<Form control={control} handleSubmit={handleSubmit} {...form}>
				<form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
					<FormField
						control={control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input autoComplete='off' placeholder='Enter your email (e.g., email@domain.com)' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input autoComplete='off' placeholder='********' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button isLoading={isLoading} type='submit'>
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
}
