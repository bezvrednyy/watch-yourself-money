import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
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
	}
}

export default async function updateCategories(req: UpdateCategoriesApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}
	const {removedSubcategoryIds} = req.body.data

	try {
		await prisma.category.deleteMany({
			where: {
				id: {
					in: removedSubcategoryIds,
				},
			},
		})
		res.status(200).send({})
	}
	catch (error) {
		res.status(500).json({
			error,
		})
	}
}