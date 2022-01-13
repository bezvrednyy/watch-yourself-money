type PrismaError = {
	type: 'prisma'
	text: string,
}

type UnknownError = {
	type: 'unknown'
	value: unknown,
}

export type ServerError = {
	type: 'server'
	meta: unknown,
}

export type TypeErrorResponse<T> = {
	type: T,
}

export type ProcessedError = PrismaError | UnknownError

function createTypeError<T>(type: T): TypeErrorResponse<T> {
	return { type }
}

function createServerError(meta: unknown): ServerError {
	return { type: 'server', meta }
}

export {
	createTypeError,
	createServerError,
}