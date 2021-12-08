import {NextApiRequest, NextApiResponse} from 'next'

export default async function getCategories(req: NextApiRequest, res: NextApiResponse) {
	const response = await fetch('http://localhost:4000/categories')
	const categories = await response.json()
	res.json({
		categories: categories.map(x => ({
			id: x['id'],
			parentCategoryId: x['parent_category_id]'],
			title: x['name'],
			type: x['type'],
			iconId: x['id_icon'],
			hexColor: x['color'],
		})),
	})
}