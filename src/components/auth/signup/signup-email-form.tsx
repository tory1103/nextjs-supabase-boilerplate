'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signupWithEmailAction } from '@/actions/auth/signup';
import { type SignupWithEmail } from '@/actions/auth/types';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { SignupWithEmailSchema } from '@/zod-schemas/auth/signup';

export default function SignupEmailForm() {
	const { toast } = useToast();
	const { control, handleSubmit, ...form } = useForm<SignupWithEmail>({
		resolver: zodResolver(SignupWithEmailSchema),
		defaultValues: {
			email: '',
			password: '',
			validationPassword: '',
		},
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function onSubmit({ email, password, validationPassword }: SignupWithEmail) {
		setIsLoading(true);
		const action = await signupWithEmailAction({ email, password, validationPassword });
		setIsLoading(false);

		if (!action.success) {
			return toast({
				description: action.error.message,
				variant: 'destructive',
			});
		}

		toast({
			description: 'You have successfully signed up!',
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

					<FormField
						control={control}
						name='validationPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirm Password</FormLabel>
								<FormControl>
									<Input autoComplete='off' placeholder='********' type='password' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button isLoading={isLoading} type='submit'>
						Sign Up
					</Button>
				</form>
			</Form>
		</div>
	);
}
