import {Category} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {verify} from '../../../common/verify'
import {OutlineIconId} from '../../../components/icons/getOutlineIconById'
import {ColorId} from '../../../common/colors/colors'
import prisma from '../../../prisma/prisma'
import {CategoryData} from '../../main-space/model/categoriesAtom'

export type UpdateCategoriesInfoRequest = {
	id: string,
	name: string,
	iconId: OutlineIconId,
	colorId: ColorId,
	editedSubcategories: Array<CategoryData>,
	newSubcategories: Array<CategoryData>,
	removedSubcategoryIds: Array<string>,
}

type UpdateCategoriesApiRequest = NextApiRequest & {
	body: {
		data: UpdateCategoriesInfoRequest,
	},
}

export default async function updateCategories(req: UpdateCategoriesApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}
	const {
		removedSubcategoryIds,
		newSubcategories,
		editedSubcategories,
		...mainCategory
	} = req.body.data as UpdateCategoriesInfoRequest

	try {
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
				},
			}),
			...editedSubcategories.map(x => prisma.category.update({
				where: {
					id: x.id,
				},
				data: remapCategoryDataToCategory(x, verify(session?.user.id)),
			})),
		])

		res.status(200).send({})
	}
	catch (error) {
		res.status(500).json({
			error,
		})
	}
}

function remapCategoryDataToCategory(data: CategoryData, userId: string): Category {
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