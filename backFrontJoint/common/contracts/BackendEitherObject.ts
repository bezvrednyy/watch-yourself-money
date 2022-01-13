import {Either, left, right} from '@sweet-monads/either'

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
	return backendEither.type === 'Left'
		? left(backendEither.value)
		: right(backendEither.value)
}

export function leftBackendEitherObject<T>(value: T): LeftEitherObject<T> {
	return { type: 'Left', value }
}

export function rightBackendEitherObject<T>(value: T): RightEitherObject<T> {
	return { type: 'Right', value }
}