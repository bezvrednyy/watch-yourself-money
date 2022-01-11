import {randomUUID} from 'crypto'
import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import prisma from '../../../prisma/prisma'
import {CategoryData} from '../../main-space/model/categoriesAtom'

type CreateCategoryRequestData = CategoryData & {
	subcategories: Array<CategoryData>,
}

type CreateCategoryRequest = NextApiRequest & {
	body: {
		data: CreateCategoryRequestData,
	}
}

export default async function createCategory(req: CreateCategoryRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	const userId = session.user.id
	const {subcategories, ...mainCategory}: CreateCategoryRequestData = req.body.data

	try {
		await prisma.category.createMany({data: [
			{
				id: mainCategory.id,
				name: mainCategory.title,
				iconId: mainCategory.iconId,
				color: mainCategory.colorId,
				type: mainCategory.type,
				userId,
			},
			...subcategories.map(x => ({
				id: randomUUID(),
				name: x.title,
				iconId: x.iconId,
				color: x.colorId,
				type: x.type,
				userId,
				parentCategoryId: x.parentCategoryId,
			})),
		]})
		res.status(200).send({})
	}
	catch (error) {
		res.status(500).json({
			error,
		})
	}
}

export type {
	CreateCategoryRequestData,
}