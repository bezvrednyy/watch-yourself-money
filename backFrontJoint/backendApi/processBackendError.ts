import {Prisma} from '@prisma/client'
import {ProcessedError} from '../common/errors'

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
			type: 'PRISMA_ERROR',
			text: processedPrismaError,
		}
	}
	return {
		type: 'UNKNOWN_ERROR',
		value: error,
	}
}