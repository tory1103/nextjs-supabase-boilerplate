/** biome-ignore-all lint/complexity/noThisInStatic: Abstract class*/
export class AbstractSingleton {
	protected static instance: unknown;

	protected constructor() {
		if (new.target === AbstractSingleton) {
			throw new Error("Abstract classes can't be instantiated.");
		}
	}

	public static getInstance<T extends AbstractSingleton>(): T {
		if (!this.instance) {
			this.instance = new this();
		}
		return this.instance as T;
	}
}
