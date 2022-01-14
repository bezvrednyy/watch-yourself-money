import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	RemoveMainCategoryLeftData,
	RemoveMainCategoryRequest,
	RemoveMainCategoryRightData,
} from '../../../backFrontJoint/common/contracts/categories/removeMainCategoryContract'
import {createStandardError, createTypeError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function removeMainCategory(req: RemoveMainCategoryRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const {categoryId, removeSubcategories} = req.body.data
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
			return sendJsonLeftData<RemoveMainCategoryLeftData>(res, 400, createTypeError('CATEGORY_NOT_FOUND'))
		}
		if (mainCategoriesCount === 1) {
			return sendJsonLeftData<RemoveMainCategoryLeftData>(res, 400, createTypeError('LAST_MAIN_CATEGORY'))
		}

		if (categoryInfo.userId !== session?.user.id) {
			return sendJsonLeftData<RemoveMainCategoryLeftData>(res, 403, createStandardError('FORBIDDEN'))
		}
		if (categoryInfo.parentCategoryId) {
			return sendJsonLeftData<RemoveMainCategoryLeftData>(res, 400, createStandardError('BAD_REQUEST'))
		}
		if (mainCategoriesCount < 1) {
			return sendJsonLeftData<RemoveMainCategoryLeftData>(res, 500, createStandardError('SERVER_ERROR', 'NO_MAIN_CATEGORIES_FOUND'))
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

		sendJsonRightData<RemoveMainCategoryRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<RemoveMainCategoryLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}