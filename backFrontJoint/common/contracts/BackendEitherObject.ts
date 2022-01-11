import {Either, left, right} from '@sweet-monads/either'

export type BackendEitherObject<L, R> = {
	type: 'Left',
	value: L
} | {
	type: 'Right',
	value: R,
}

export function processBackendEither<L, R>(backendEither: BackendEitherObject<L, R>): Either<L, R> {
	return backendEither.type === 'Left'
		? left(backendEither.value)
		: right(backendEither.value)
}