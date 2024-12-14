'use client';

import { zodResolver }           from '@hookform/resolvers/zod';
import { redirect }              from 'next/navigation';
import { useState }              from 'react';
import { useForm }               from 'react-hook-form';
import { z }                     from 'zod';

import { signinWithEmailAction } from '@/actions/auth/signin';
import { Button }                from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
}                                from '@/components/ui/form';
import { Input }                 from '@/components/ui/input';
import { useToast }              from '@/hooks/use-toast';
import { SigninWithEmailSchema } from '@/zod-schemas/auth/signin';


type SigninFormProps = {};
type SigninWithEmailSchemaType = z.infer<typeof SigninWithEmailSchema>;

export default function SigninEmailForm( props: SigninFormProps )
{
	const {} = props;

	const
		{ toast }                          = useToast(),
		{ control, handleSubmit, ...form } = useForm<SigninWithEmailSchemaType>
		(
			{
				resolver     : zodResolver( SigninWithEmailSchema ),
				defaultValues: {
					email   : '',
					password: ''
				}
			}
		);

	const [ isLoading, setIsLoading ] = useState<boolean>( false );

	async function onSubmit( { email, password }: SigninWithEmailSchemaType )
	{
		setIsLoading( true );
		const action = await signinWithEmailAction( { email, password } );
		setIsLoading( false );

		if ( !action.success ) return toast
		(
			{
				description: action.error.message,
				variant    : 'destructive'
			}
		);

		toast
		(
			{
				description: 'You have successfully signed in'
			}
		);

		redirect( '/' );
	}

	return (
		<div className={ 'w-full' }>
			<Form control={ control } handleSubmit={ handleSubmit } { ...form }>
				<form onSubmit={ handleSubmit( onSubmit ) } className={ 'flex flex-col gap-4' }>
					<FormField
						control={ control }
						name={ 'email' }
						render={ ( { field } ) => (
							<FormItem>
								<FormLabel>Email Address</FormLabel>
								<FormControl>
									<Input placeholder={ 'Enter your email (e.g., email@domain.com)' }
									       autoComplete={ 'off' } { ...field } />
								</FormControl>
								<FormMessage/>
							</FormItem>
						) }
					/>

					<FormField
						control={ control }
						name={ 'password' }
						render={ ( { field } ) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type={ 'password' } placeholder={ '********' } autoComplete={ 'off' } { ...field } />
								</FormControl>
								<FormMessage/>
							</FormItem>
						) }
					/>

					<Button type={ 'submit' } isLoading={ isLoading }>
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
}