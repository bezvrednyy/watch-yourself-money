type PrismaError = {
	type: 'prisma'
	text: string,
}

type UnknownError = {
	type: 'unknown'
	value: unknown,
}

export type TextErrorResponse = {
	error: {
		type: 'text',
		value: string,
	}
}

export type TypeErrorResponse<T> = {
	error: {
		type: T,
	}
}

export type ProcessedError = PrismaError | UnknownError

function createTypeError<T>(type: T): TypeErrorResponse<T> {
	return { error: { type } }
}

export {
	createTypeError,
}