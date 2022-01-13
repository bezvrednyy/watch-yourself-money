import {Prisma} from '@prisma/client'
import {ProcessedError, TextErrorResponse} from '../common/errors'

export function processPrismaError<T>(error: T): string|T {
	if (error instanceof Prisma.PrismaClientInitializationError
		|| error instanceof Prisma.PrismaClientKnownRequestError
		|| error instanceof Prisma.PrismaClientUnknownRequestError
		|| error instanceof Prisma.PrismaClientValidationError
		|| error instanceof Prisma.PrismaClientRustPanicError) {
		return error.message
	}
	return error
}

export function processBackendError<T>(error: T): ProcessedError {
	//TODO:logs. Мб есть хорошие инструменты в npm
	const processedPrismaError = processPrismaError(error)
	if (typeof processedPrismaError === 'string') {
		return {
			type: 'prisma',
			text: processedPrismaError,
		}
	}
	return {
		type: 'unknown',
		value: error,
	}
}

export function getBackendTextErrorResponse<T>(error: T): TextErrorResponse {
	const processedError = processBackendError(error)
	const value = processedError.type === 'unknown'
		? `Unknown error: ${JSON.stringify(error)}`
		: processedError.text
	return { error: { type: 'text', value }}
}