import {CategoryType} from '@prisma/client'
import {randomUUID} from 'crypto'
import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {ColorId} from '../../../common/colors/colors'
import {OutlineIconId} from '../../../components/icons/getOutlineIconById'
import prisma from '../../../prisma/prisma'

type CategoryData = {
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	colorId: ColorId,
}

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
	const parentCategoryId = randomUUID()

	try {
		await prisma.category.createMany({data: [
			{
				id: parentCategoryId,
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
				parentCategoryId,
			})),
		]})
		res.status(200).send({})
	}
	catch (error) {
		res.status(500).json({
			text: error,
		})
	}
}