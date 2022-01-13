import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetCategoriesLeftData,
	GetCategoriesRightData,
} from '../../../backFrontJoint/common/contracts/categories/getCategoriesContract'
import {createServerError} from '../../../backFrontJoint/common/errors'
import {ColorId} from '../../../common/colors/colors'
import {verify} from '../../../common/utils/verify'
import {OutlineIconId} from '../../../commonClient/uikit/icons/getOutlineIconById'
import prisma from '../../../prisma/prisma'
import {ClientCategoryData} from '../../main-space/model/categoriesAtom'

export default async function getCategories(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const categories = await prisma.category.findMany({where: {user: {
			id: verify(session.user.id, 'Server error: email not found'),
		}}})

		const remappedCategories = categories.map(x => {
			const remappedValue: ClientCategoryData = {
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

		sendJsonRightData<GetCategoriesRightData>(res, { categories: remappedCategories })
	}
	catch (error) {
		sendJsonLeftData<GetCategoriesLeftData>(res, 500, createServerError(error))
	}
}