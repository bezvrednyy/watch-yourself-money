import {NextApiResponse} from 'next'
import {leftBackendEitherObject, rightBackendEitherObject} from '../common/contracts/BackendEitherObject'

export function sendJsonRightData<T>(res: NextApiResponse, data: T) {
	res.status(200).json(rightBackendEitherObject(data))
}

export function sendJsonLeftData<T>(res: NextApiResponse, code: number, data: T) {
	res.status(code).json(leftBackendEitherObject(data))
}
