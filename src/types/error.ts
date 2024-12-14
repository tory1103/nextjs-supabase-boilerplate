export type TError<T> =
	T & {
	code: string | number;
	message: string;
};
