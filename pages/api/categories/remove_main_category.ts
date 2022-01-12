import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {getBackendErrorText} from '../../../backFrontJoint/backendApi/processBackendError'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {sendJsonTextError} from '../../../backFrontJoint/backendApi/sendJsonTextError'
import {
	RemoveMainCategoryLeftData,
	RemoveMainCategoryRequest,
	RemoveMainCategoryRightData,
} from '../../../backFrontJoint/common/contracts/categories/removeMainCategoryContract'
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

		//TODO:clientApi, нужно отправлять типы ошибок, а на фронте отображать текст
		if (!categoryInfo) {
			return sendJsonTextError(res, 500, 'Category not found')
		}
		if (categoryInfo.userId !== session?.user.id) {
			return sendJsonTextError(res, 403, 'Not enough rights')
		}
		if (!categoryInfo.parentCategoryId) {
			return sendJsonTextError(res, 400, 'Is not category. Is it subcategory')
		}
		if (mainCategoriesCount < 1) {
			return sendJsonTextError(res, 500, 'Not found main categories')
		}
		if (mainCategoriesCount === 1) {
			return sendJsonTextError(res, 400, 'The last category cannot be deleted')
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
		sendJsonLeftData<RemoveMainCategoryLeftData>(res, 500, { error: getBackendErrorText(error) })
	}
}