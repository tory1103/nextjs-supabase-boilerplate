'use client';

import { Bars3Icon } from '@heroicons/react/24/outline';
import Link          from 'next/link';
import { useState }  from 'react';

import SidebarNavbar from '@/components/navbar/sidebar-navbar';
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	navigationMenuTriggerStyle
}                    from '@/components/ui/navigation-menu';
import ToggleTheme   from '@/components/ui/toggle-theme';


type NavbarProps = {};

export type NavbarNavigationMenuItem = {
	label: string;
	href: string;
}

const items: NavbarNavigationMenuItem[] =
	      [
		      { label: 'Singin', href: '/auth/signin' },
		      { label: 'Singup', href: '/auth/signup' }
	      ];

export default function Navbar( props: NavbarProps )
{
	const {} = props;

	const [ isSidebarOpen, setIsSidebarOpen ] = useState<boolean>( false );

	return (
		<nav className={ 'border-b flex flex-row gap-4 p-4' }>
			<div className={ 'grow md:grow-0 flex flex-row justify-between items-center ' }>
				<Link href={ '/' } className={ 'text-xl text-muted-foreground' }>LOGO</Link>
				<Bars3Icon className={ 'md:hidden size-6' } onClick={ () => setIsSidebarOpen( true ) }/>
			</div>

			<div className={ 'grow hidden md:flex flex-row justify-between' }>
				<NavigationMenu>
					<NavigationMenuList>
						{
							items.map
							(
								( { label, href }, index ) =>
									<NavigationMenuItem key={ index }>
										<Link href={ href } legacyBehavior passHref>
											<NavigationMenuLink className={ navigationMenuTriggerStyle() }>
												{ label }
											</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
							)
						}
					</NavigationMenuList>
				</NavigationMenu>

				<ToggleTheme/>
			</div>

			<SidebarNavbar isOpen={ isSidebarOpen } onClose={ () => setIsSidebarOpen( false ) } items={ items }/>
		</nav>
	);
}