import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {verify} from '../../../common/verify'
import {OutlineIconId} from '../../../components/icons/getOutlineIconById'
import {ColorId} from '../../../common/colors/colors'
import prisma from '../../../prisma/prisma'
import {CategoryData} from '../../main-space/categoriesSection/model/categoriesAtom'

export type UpdateCategoriesInfoRequest = {
	id: number,
	name: string,
	iconId: OutlineIconId,
	colorId: ColorId,
	editedSubcategories: Array<CategoryData>,
	newSubcategories: Array<CategoryData>,
	removedSubcategoryIds: Array<number>,
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
	const {removedSubcategoryIds, newSubcategories} = req.body.data as UpdateCategoriesInfoRequest

	try {
		await prisma.category.deleteMany({
			where: {
				id: {
					in: removedSubcategoryIds,
				},
			},
		})
		await prisma.category.createMany({
			data: newSubcategories.map(x => ({
				id: x.id,
				parentCategoryId: x.parentCategoryId,
				color: x.colorId,
				name: x.title,
				iconId: x.iconId,
				type: x.type,
				userId: Number(
					verify(session?.user.id),
				),
			})),
		})
		res.status(200).send({})
	}
	catch (error) {
		res.status(500).json({
			error,
		})
	}
}