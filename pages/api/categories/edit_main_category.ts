import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	EditMainCategoryLeftData,
	EditMainCategoryRequest,
	EditMainCategoryRightData,
} from '../../../backFrontJoint/common/contracts/categories/editMainCategoryContract'
import {createStandardError, createTypeError} from '../../../backFrontJoint/common/errors'
import prisma from '../../../prisma/prisma'

export default async function editMainCategory(req: EditMainCategoryRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}
	const {
		removedSubcategoriesData,
		newSubcategories,
		editedSubcategories,
		...mainCategory
	} = req.body.data

	try {
		const currentCategoryData = await prisma.category.findUnique({
			where: { id: mainCategory.id },
			select: { userId: true },
		})

		if (!currentCategoryData) {
			return sendJsonLeftData<EditMainCategoryLeftData>(res, 400, createTypeError('CATEGORY_NOT_FOUND'))
		}
		if (currentCategoryData.userId !== session?.user.id) {
			return sendJsonLeftData<EditMainCategoryLeftData>(res, 403, createStandardError('FORBIDDEN'))
		}

		const userId = session.user.id

		if (removedSubcategoriesData && removedSubcategoriesData.saveTransactions) {
			await prisma.transaction.updateMany({
				data: { categoryId: mainCategory.id },
				where: { categoryId: { in: removedSubcategoriesData.ids } },
			})
		}

		await Promise.all([
			!!removedSubcategoriesData && prisma.category.deleteMany({
				where: { id: { in: removedSubcategoriesData.ids } },
			}),
			prisma.category.createMany({
				data: newSubcategories.map(x => ({
					id: x.id,
					color: x.colorId,
					name: x.title,
					iconId: x.iconId,
					type: x.type,
					parentCategoryId: mainCategory.id,
					userId,
				})),
			}),
			prisma.category.update({
				where: { id: mainCategory.id },
				data: {
					iconId: mainCategory.iconId,
					color: mainCategory.colorId,
					name: mainCategory.title,
					type: mainCategory.type,
				},
			}),
			...editedSubcategories.map(x => prisma.category.update({
				where: { id: x.id },
				data: {
					id: x.id,
					color: x.colorId,
					name: x.title,
					iconId: x.iconId,
					type: x.type,
					parentCategoryId: x.parentCategoryId || null,
					userId,
				},
			})),
		])

		sendJsonRightData<EditMainCategoryRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<EditMainCategoryLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}