'use client';

import { XMarkIcon }                  from '@heroicons/react/24/outline';
import Link                           from 'next/link';
import { usePathname }                from 'next/navigation';

import { signoutAction }              from '@/actions/auth/signout';
import { NavbarNavigationMenuItem }   from '@/components/navbar/navbar';
import { Button }                     from '@/components/ui/button';
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import ToggleTheme                    from '@/components/ui/toggle-theme';
import { useAuth }                    from '@/hooks/use-auth';


type SidebarNavbarProps = {
	isOpen: boolean;
	onClose: () => void;
	items: NavbarNavigationMenuItem[];
};

export default function SidebarNavbar( props: SidebarNavbarProps )
{
	const { isOpen, onClose, items } = props;

	const
		pathname = usePathname(),
		{ user } = useAuth();

	return (
		<div
			className=
				{
					`fixed top-0 start-0 ${ isOpen ? 'translate-x-0' : '-translate-x-full' } w-[80vw] h-dvh z-50
					border-e transition duration-500 ease-in-out bg-background overflow-y-auto`
				}
		>
			<div className={ 'flex flex-col gap-4' }>
				<div className={ 'sticky top-0 flex flex-row justify-between w-full bg-background border-b p-3 md:p-4' }>
					<p className={ 'text-xl text-muted-foreground' }>LOGO</p>
					<Button variant={ 'ghost' } onClick={ onClose }>
						<XMarkIcon/>
					</Button>
				</div>

				<div className={ 'flex flex-col gap-4 px-4' }>
					{
						items.map
						(
							( { label, href }, index ) =>
								<Link key={ index } href={ href }
								      className={ `${ navigationMenuTriggerStyle() } ${ pathname === href && 'underline underline-offset-4' }` }>
									{ label }
								</Link>
						)
					}
				</div>

				<div className={ 'absolute bottom-0 end-0 flex flex-row justify-between w-full p-3 md:p-4 ' }>
					{
						user ? (
							<Button onClick={ signoutAction }>Sign out</Button>
						) : (
							<Button>
								<Link href={ '/auth/signin' }>
									Sign in to continue
								</Link>
							</Button>
						)
					}

					<ToggleTheme/>
				</div>
			</div>
		</div>
	);
}