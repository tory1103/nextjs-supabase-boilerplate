'use client';

import { ChevronRight } from 'lucide-react';
import Link             from 'next/link';
import { usePathname }  from 'next/navigation';
import {
	Fragment,
	ReactNode
}                       from 'react';

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
}                       from '@/components/ui/breadcrumb';


type BreadcrumbsProps = {
	home?: ReactNode;
	separator?: ReactNode;
};

export default function Breadcrumbs( props: BreadcrumbsProps )
{
	const { home, separator = <ChevronRight/> } = props;

	const
		pathname          = usePathname(),
		pathnameEndpoints = pathname.split( '/' ).filter( Boolean );

	return (
		<Breadcrumb>
			<BreadcrumbList>
				{
					home &&
					<Fragment key={ 'home' }>
						<BreadcrumbItem key={ 'endpoint@home' }>
							<BreadcrumbLink asChild>
								<Link href={ '/' }>
									<BreadcrumbPage>
										{ home }
									</BreadcrumbPage>
								</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>

						<BreadcrumbSeparator key={ 'separator@home' }>
							{ separator }
						</BreadcrumbSeparator>
					</Fragment>
				}

				{
					pathnameEndpoints.map
					(
						( endpoint, index ) =>
							(
								<Fragment key={ `${ endpoint }@${ index }` }>
									<BreadcrumbItem key={ `endpoint@${ endpoint }@${ index }` }>
										<BreadcrumbLink asChild>
											<Link href={ `/${ pathnameEndpoints.slice( 0, index + 1 ).join( '/' ) }` }>
												<BreadcrumbPage>
													{ endpoint }
												</BreadcrumbPage>
											</Link>
										</BreadcrumbLink>
									</BreadcrumbItem>

									{
										!( index === pathnameEndpoints.length - 1 ) &&
										<BreadcrumbSeparator key={ `separator@${ endpoint }@${ index }` }>
											{ separator }
										</BreadcrumbSeparator>
									}
								</Fragment>
							)
					)
				}
			</BreadcrumbList>
		</Breadcrumb>
	)
		;
}