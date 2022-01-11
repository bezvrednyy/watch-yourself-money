import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonError} from '../../../backFrontJoint/backendApi/sendJsonError'
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

export default async function removeMainCategory(req: RemoveCategoryRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const {categoryId, removeSubcategories}: RemoveCategoryRequestData = req.body.data
		const [categoryInfo, mainCategoriesCount] = await Promise.all([
			prisma.category.findUnique({
				where: { id: categoryId },
				select: { userId: true, parentCategoryId: true },
			}),
			prisma.category.count({ where: {
				userId: session.user.id,
				parentCategoryId: null,
			}}),
		])

		if (!categoryInfo) {
			return sendJsonError(res, 500, 'Category not found')
		}
		if (categoryInfo.userId !== session?.user.id) {
			return sendJsonError(res, 403, 'Not enough rights')
		}
		if (!categoryInfo.parentCategoryId) {
			return sendJsonError(res, 400, 'Is not category. Is it subcategory')
		}
		if (mainCategoriesCount < 1) {
			return sendJsonError(res, 500, 'Not found main categories')
		}
		if (mainCategoriesCount === 1) {
			return sendJsonError(res, 400, 'The last category cannot be deleted')
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
		res.status(500).json({ error })
	}
}

export type {
	RemoveCategoryRequestData,
}