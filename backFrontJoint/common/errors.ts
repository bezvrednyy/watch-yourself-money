type PrismaError = {
	type: 'PRISMA_ERROR'
	text: string,
}

type UnknownError = {
	type: 'UNKNOWN_ERROR'
	value: unknown,
}

export type StandardError = {
	type: StandardErrorType
	meta?: unknown,
}

export type TypeErrorResponse<T> = {
	type: T,
}

export type StandardErrorType = 'SERVER_ERROR'
	|'FORBIDDEN'
	|'BAD_REQUEST'

export type ProcessedError = PrismaError | UnknownError

function createTypeError<T>(type: T): TypeErrorResponse<T> {
	return { type }
}

function createStandardError(type: StandardErrorType, meta?: unknown): StandardError {
	return { type, meta }
}

export {
	createTypeError,
	createStandardError,
}