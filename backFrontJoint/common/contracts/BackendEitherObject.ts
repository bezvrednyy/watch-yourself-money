import {Either, left, right} from '@sweet-monads/either'
import {getEnvType} from '../../../commonClient/environment/clientEnv'

type LeftEitherObject<L> = {
	type: 'Left',
	value: L
}

type RightEitherObject<R> = {
	type: 'Right',
	value: R,
}

export type BackendEitherObject<L, R> = LeftEitherObject<L> | RightEitherObject<R>

export function processBackendEither<L, R>(backendEither: BackendEitherObject<L, R>): Either<L, R> {
	const result = backendEither.type === 'Left'
		? left(backendEither.value)
		: right(backendEither.value)
	if (getEnvType() === 'development') {
		console.log(result)
	}
	return result
}

export function leftBackendEitherObject<T>(value: T): LeftEitherObject<T> {
	return { type: 'Left', value }
}

export function rightBackendEitherObject<T>(value: T): RightEitherObject<T> {
	return { type: 'Right', value }
}