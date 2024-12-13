'use client';

import { type User } from '@supabase/supabase-js';
import {
	ReactNode,
	createContext,
	useContext
}                    from 'react';


type AuthContextType = {
	user: User | null;
}

const Context = createContext<AuthContextType>( { user: null } );

export function AuthContextProvider
(
	{ children, user }:
		{
			children: ReactNode;
			user: AuthContextType['user'];
		}
)
{
	return (
		<Context.Provider value={ { user } }>
			{ children }
		</Context.Provider>
	);
}

export const useAuth = () => useContext( Context );