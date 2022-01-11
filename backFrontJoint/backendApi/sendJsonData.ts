import {left, right} from '@sweet-monads/either'
import {NextApiResponse} from 'next'

export function sendJsonRightData<T>(res: NextApiResponse, data: T) {
	res.status(200).json(right(data))
}

export function sendJsonLeftData<T>(res: NextApiResponse, code: number, data: T) {
	res.status(code).json(left(data))
}
