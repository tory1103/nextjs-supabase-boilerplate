'use client';

import {
	REALTIME_SUBSCRIBE_STATES,
	RealtimeChannel
}                                 from '@supabase/realtime-js';
import {
	ReactNode,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState
}                                 from 'react';

import { createSupabaseCLClient } from '@/lib/supabase/client';


type RealTimeProviderProps = {
	channel: string;
	presenceUID: string;
	presencePayload?: { [key: string]: any }
	event?: string;
	children: ReactNode;
};

type RealTimeContextType = {
	messages: string[];
	presences: RealTimeProviderProps['presencePayload'][];
	isConnected: boolean;
	sendMessage: ( message: string ) => void;
	reconnect: () => void;
	disconnect: () => void;
}

const RealTimeContext = createContext<RealTimeContextType>
(
	{
		messages   : [],
		presences  : [],
		isConnected: false,
		sendMessage: () => undefined,
		reconnect  : () => undefined,
		disconnect : () => undefined
	}
);

export default function RealTimeProvider( props: RealTimeProviderProps )
{
	const
		defaultPresencePayload = useMemo( () => ( {} ), [] ),
		defaultEvent           = useMemo( () => 'message', [] );

	const { children, channel, event = defaultEvent, presenceUID, presencePayload = defaultPresencePayload } = props;

	const
		supabase                                = createSupabaseCLClient(),
		[ supabaseChannel, setSupabaseChannel ] = useState<RealtimeChannel | undefined>( undefined ),
		[ messages, setMessages ]               = useState<string[]>( [] ),
		[ presences, setPresences ]             = useState<RealTimeProviderProps['presencePayload'][]>( [] );

	const sendMessage = useCallback
	(
		async ( realtimeChannel: RealtimeChannel | undefined, message: string ) =>
		{
			if ( !realtimeChannel ) return;

			await realtimeChannel.send
			(
				{
					event,
					type   : 'broadcast',
					payload: { presenceUID, message }
				}
			);
		}, [ event, presenceUID ]
	);

	const connect = useCallback
	(
		async ( realtimeChannel: RealtimeChannel | undefined ) =>
		{
			if ( !realtimeChannel ) return;

			realtimeChannel.on
			(
				'broadcast',
				{ event },
				( { payload } ) =>
					setMessages( ( messages ) => [ ...messages, payload.message ] )
			);

			realtimeChannel.on
			(
				'presence',
				{ event: 'join' },
				( { newPresences } ) =>
					setPresences( ( presences ) => [ ...presences, ...newPresences ] )
			);

			realtimeChannel.on
			(
				'presence',
				{ event: 'leave' },
				( { leftPresences } ) =>
					setPresences
					(
						( presences ) =>
							presences.filter
							(
								( presence ) =>
									leftPresences.some
									(
										( leftPresence ) =>
											( leftPresence?.presence_ref !== presence?.presence_ref )
									)
							)
					)
			);

			realtimeChannel.subscribe
			(
				async ( status ) =>
				{
					switch ( status )
					{
						case REALTIME_SUBSCRIBE_STATES.SUBSCRIBED:
							await realtimeChannel.track( { ...presencePayload, presenceUID, online_at: new Date().toISOString() } );
							setSupabaseChannel( realtimeChannel as any ); // Ignore version mismatch
							break;
					}
				}
			);
		}, [ event, presenceUID, presencePayload ]
	);

	const disconnect = useCallback
	(
		async ( realtimeChannel: RealtimeChannel | undefined ) =>
		{
			if ( !realtimeChannel ) return;

			await realtimeChannel.untrack();
			await realtimeChannel.unsubscribe();

			setPresences( [] );
			setSupabaseChannel( undefined );
		}, []
	);

	useEffect
	(
		() =>
		{
			const realtimeChannel = supabase.channel( channel );
			connect( realtimeChannel as any ).catch( console.error );
			return () => { disconnect( realtimeChannel as any ).catch( console.error );};
		}, [ supabase, channel, event, presenceUID, disconnect, connect ] );

	return (
		<RealTimeContext.Provider
			value=
				{
					{
						messages,
						presences,
						isConnected: !!supabaseChannel,
						sendMessage: ( message: string ) => sendMessage( supabaseChannel, message ),
						reconnect  : () =>
						{
							if ( !supabaseChannel )
								connect( supabase.channel( channel ) as any ).catch( console.error );
						},
						disconnect : () =>
						{
							if ( supabaseChannel )
								disconnect( supabaseChannel ).catch( console.error );
						}
					}
				}
		>
			{ children }
		</RealTimeContext.Provider>
	);
}

export const useRealTime = () => useContext( RealTimeContext );
