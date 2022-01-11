import {left} from '@sweet-monads/either'
import {NextApiResponse} from 'next'
import {TextErrorResponse} from '../common/errors'

export function sendJsonTextError(res: NextApiResponse, code: number, error: string) {
	const response: TextErrorResponse = { error }
	res.status(code).json(left(response))
}