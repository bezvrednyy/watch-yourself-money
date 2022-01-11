import {NextApiResponse} from 'next'

export function sendJsonError(res: NextApiResponse, code: number, text: string) {
	res.status(code).json({ text })
}