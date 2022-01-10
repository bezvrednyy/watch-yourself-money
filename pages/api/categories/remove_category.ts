import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import prisma from '../../../prisma/prisma'

type RemoveCategoryRequestData = {
	categoryId: string,
	removeSubcategories: boolean,
}

type RemoveCategoryRequest = NextApiRequest & {
	body: {
		data: RemoveCategoryRequestData,
	}
}

export default async function removeCategory(req: RemoveCategoryRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const {categoryId, removeSubcategories}: RemoveCategoryRequestData = req.body.data
		const categoryInfo = await prisma.category.findUnique({
			where: {
				id: categoryId,
			},
			select: {
				userId: true,
			},
		})

		if (!categoryInfo) {
			res.status(500).json({
				text: 'Category not found',
			})
			return
		}

		if (categoryInfo.userId !== session?.user.id) {
			//Когда запрос ушёл от пользователя на добавление транзакции другому пользователю
			res.status(403).json({
				text: 'Not enough rights',
			})
		}

		await prisma.$transaction([
			removeSubcategories
				? prisma.category.deleteMany({ where: { parentCategoryId: categoryId }})
				: prisma.category.updateMany({
					where: { parentCategoryId: categoryId },
					data: { parentCategoryId: null },
				}),
			prisma.category.delete({where: { id: categoryId }}),
		])

		res.status(200).send({})
	}
	catch (error) {
		res.status(500).json({
			text: error,
		})
	}
}

export type {
	RemoveCategoryRequestData,
}