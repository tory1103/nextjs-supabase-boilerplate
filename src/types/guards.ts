export type Guard = () => Promise<boolean>;

export type GuardedReturn<K, L> =
	| {
			success: true;
			data: K;
	  }
	| {
			success: false;
			data: L;
	  };
