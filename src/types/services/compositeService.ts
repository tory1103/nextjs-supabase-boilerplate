export interface CompositeService<T, K> {
	create(data: T): Promise<K>;

	read(firstId: string, secondId: string): Promise<K | null>;

	readAll(): Promise<K[]>;

	update(firstId: string, secondId: string, data: T): Promise<K>;

	delete(firstId: string, secondId: string): Promise<K>;
}
