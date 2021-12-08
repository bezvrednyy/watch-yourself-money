import {NextApiRequest, NextApiResponse} from 'next'

export default async function getCategories(req: NextApiRequest, res: NextApiResponse) {
	//TODO: Запрос в базу const response = await fetch('http://localhost:4000/')
	res.json({
		categories: [{
			id: 1,
		}]
	})
}