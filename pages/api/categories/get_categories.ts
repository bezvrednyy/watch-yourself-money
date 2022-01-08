import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {ColorId} from '../../../common/colors/colors'
import {verify} from '../../../common/verify'
import {OutlineIconId} from '../../../components/icons/getOutlineIconById'
import prisma from '../../../prisma/prisma'
import {CategoryData} from '../../main-space/categoriesSection/model/categoriesAtom'

export default async function getCategories(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })

	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	const categories = await prisma.category.findMany({
		where: {
			user: {
				email: verify(session.user.email, 'Server error: email not found'),
			},
		},
	})

	const remappedCategories = categories.map(x => {
		const remappedValue: CategoryData = {
			id: x.id,
			title: x.name,
			type: x.type,
			iconId: x.iconId as OutlineIconId,
			colorId: x.color as ColorId,
		}
		if (x.parentCategoryId) {
			remappedValue.parentCategoryId = x.parentCategoryId
		}
		return remappedValue
	})

	res.json({
		categories: remappedCategories,
	})
}