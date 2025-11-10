'use client';

import { type ReactNode } from 'react';
import SignupEmailForm from '@/components/auth/signup/signup-email-form';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';

type SignupModalProps = {
	dialogTriggerChild?: ReactNode;
};

export default function SignupEmailFormDialog(props: SignupModalProps) {
	const { dialogTriggerChild } = props;

	return (
		<Dialog>
			<DialogTrigger asChild={true}>
				{dialogTriggerChild ? dialogTriggerChild : <Button variant='outline'>Sign Up</Button>}
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Sign Up</DialogTitle>
					<DialogDescription>Sign up to create your account and start using our services.</DialogDescription>
				</DialogHeader>

				<SignupEmailForm />
			</DialogContent>
		</Dialog>
	);
}
