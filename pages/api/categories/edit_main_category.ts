import {Category} from '@prisma/client'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	EditMainCategoryLeftData,
	EditMainCategoryRequest,
	EditMainCategoryRightData,
} from '../../../backFrontJoint/common/contracts/categories/editMainCategoryContract'
import {GetCategoriesCategoryData} from '../../../backFrontJoint/common/contracts/categories/getCategoriesContract'
import {createStandardError} from '../../../backFrontJoint/common/errors'
import {verify} from '../../../common/utils/verify'
import prisma from '../../../prisma/prisma'

export default async function editMainCategory(req: EditMainCategoryRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}
	const {
		removedSubcategoryIds,
		newSubcategories,
		editedSubcategories,
		...mainCategory
	} = req.body.data

	try {
		//TODO:category, при удалении подкатегории транзакции должны удалиться. Добавить сообщение об этом.
		await Promise.all([
			prisma.category.deleteMany({
				where: {
					id: {
						in: removedSubcategoryIds,
					},
				},
			}),
			prisma.category.createMany({
				data: newSubcategories.map(x => remapCategoryDataToCategory(x, verify(session?.user.id))),
			}),
			prisma.category.update({
				where: {
					id: mainCategory.id,
				},
				data: {
					iconId: mainCategory.iconId,
					color: mainCategory.colorId,
					name: mainCategory.name,
					type: mainCategory.type,
				},
			}),
			...editedSubcategories.map(x => prisma.category.update({
				where: {
					id: x.id,
				},
				data: remapCategoryDataToCategory(x, verify(session?.user.id)),
			})),
		])

		sendJsonRightData<EditMainCategoryRightData>(res, undefined)
	}
	catch (error) {
		sendJsonLeftData<EditMainCategoryLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}

function remapCategoryDataToCategory(data: GetCategoriesCategoryData, userId: string): Category {
	return {
		id: data.id,
		parentCategoryId: data.parentCategoryId || null,
		color: data.colorId,
		name: data.title,
		iconId: data.iconId,
		type: data.type,
		userId,
	}
}