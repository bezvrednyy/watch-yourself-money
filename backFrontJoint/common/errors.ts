type PrismaError = {
	type: 'prisma'
	text: string,
}

type UnknownError = {
	type: 'unknown'
	value: unknown,
}

export type TextErrorResponse = {
	error: string
}

export type ProcessedError = PrismaError | UnknownError
