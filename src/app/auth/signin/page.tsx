'use client';

import Link            from 'next/link';

import SigninEmailForm from '@/components/auth/signin/signin-email-form';


type SigninPageProps = {};

export default function SigninPage( props: SigninPageProps )
{
	const {} = props;

	return (
		<div className={ 'bg-background bg-default-pattern flex flex-col justify-center items-center gap-8 w-dvw h-dvh p-8' }>
			<h1 className={ 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl' }>
				Log In to Your Account
			</h1>

			<div className={ 'w-full md:w-1/2 lg:w-1/3 xl:w-1/4' }>
				<SigninEmailForm/>
			</div>

			<p className={ 'text-sm text-muted-foreground' }>
				Don&rsquo;t have an account? <Link href={ '/auth/signup' } className={ 'underline' }>Sign up</Link>
			</p>
		</div>
	);
}