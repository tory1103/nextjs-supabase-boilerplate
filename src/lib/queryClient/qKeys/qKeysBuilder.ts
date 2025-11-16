/** biome-ignore-all lint/suspicious/noExplicitAny: <Ignore ANY> */
export type QKeys = Record<string, (...args: any[]) => any>;

export class QKeysBuilder<T extends QKeys, S extends string> {
	private readonly keys: T;
	private readonly scope: S;

	constructor(scope: S, keys: T) {
		this.keys = keys;
		this.scope = scope;
	}

	get<K extends keyof T>(key: K, ...args: Parameters<T[K]>): readonly [S, ...ReturnType<T[K]>] {
		return [this.scope, ...(this.keys[key](...args) as ReturnType<T[K]>)] as const;
	}

	getScope(): readonly [S] {
		return [this.scope];
	}
}
