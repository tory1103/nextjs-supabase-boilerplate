/** biome-ignore-all lint/suspicious/noExplicitAny: Necesario para permitir funciones genéricas con cualquier tipo de argumento */
export interface Service<T, K> {
	create(data: T): Promise<K>;

	read(id: string): Promise<K | null>;

	readAll(): Promise<K[]>;

	update(id: string, data: T): Promise<K>;

	delete(id: string): Promise<K>;
}

export type ServiceArgs<T extends (...args: any[]) => any> = Parameters<T>;

export type ServiceOutput<T extends (...args: any[]) => any> = Awaited<ReturnType<T>>;
