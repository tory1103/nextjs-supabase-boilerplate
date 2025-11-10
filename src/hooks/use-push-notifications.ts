'use client';

import { useCallback, useEffect, useState } from 'react';

export default function usePushNotifications() {
	const [hasNotificationPermission, setHasNotificationPermission] = useState<boolean>(false);

	useEffect(() => setHasNotificationPermission('Notification' in window && Notification.permission === 'granted'), []);

	const requestPermission = useCallback(
		(callback = () => {}) => {
			if (!hasNotificationPermission) {
				Notification.requestPermission()
					.then(value => {
						if (value === 'granted') {
							setHasNotificationPermission(true);
							callback();
						}
					})
					.catch(console.error);
			}
		},
		[hasNotificationPermission],
	);

	const notify = useCallback(
		(
			title: string,
			options?: NotificationOptions,
			events?: Pick<Notification, 'onclick' | 'onerror' | 'onshow' | 'onclose'>,
		) => {
			if (!hasNotificationPermission) {
				requestPermission(() => notify(title, options, events));
				return;
			}

			Object.assign(new Notification(title, options), events);
		},
		[hasNotificationPermission, requestPermission],
	);

	return {
		hasNotificationPermission,
		requestPermission,
		notify,
	};
}
