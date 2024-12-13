export type TError<T extends Record<string, string>> =
	{
		[key in keyof T]: T[key];
	} & {
		code: string | number;
		message: string;
	};
