'use client';

import { ReactNode }   from 'react';

import SigninEmailForm from '@/components/auth/signin/signin-email-form';
import { Button }      from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
}                      from '@/components/ui/dialog';


type SigninModalProps = {
	dialogTriggerChild?: ReactNode;
};

export default function SigninEmailFormDialog( props: SigninModalProps )
{
	const { dialogTriggerChild } = props;

	return (
		<Dialog>
			<DialogTrigger asChild>
				{ dialogTriggerChild ? dialogTriggerChild : <Button variant={ 'outline' }>Login</Button> }
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Log In to Your Account</DialogTitle>
					<DialogDescription>
						Please provide your email address and password to access your account.
					</DialogDescription>
				</DialogHeader>

				<SigninEmailForm/>
			</DialogContent>
		</Dialog>
	);
}