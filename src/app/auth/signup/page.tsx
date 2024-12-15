'use client';

import Link            from 'next/link';

import SignupEmailForm from '@/components/auth/signup/signup-email-form';


type SignupPageProps = {};

export default function SignupPage( props: SignupPageProps )
{
	const {} = props;

	return (
		<div className={ 'bg-background bg-default-pattern flex flex-col justify-center items-center gap-8 w-dvw h-dvh p-8' }>
			<h1 className={ 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl' }>
				Create Your Account
			</h1>

			<div className={ 'w-full md:w-1/2 lg:w-1/3 xl:w-1/4' }>
				<SignupEmailForm/>
			</div>

			<p className={ 'text-sm text-muted-foreground' }>
				Already have an account? <Link href={ '/auth/signin' } className={ 'underline' }>Log in</Link>
			</p>
		</div>
	);
}