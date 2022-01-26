import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetCategoriesLeftData,
	GetCategoriesRightData,
} from '../../../backFrontJoint/common/contracts/categories/getCategoriesContract'
import {createStandardError} from '../../../backFrontJoint/common/errors'
import {ColorId} from '../../../common/colors/colors'
import {OutlineIconId} from '../../../pagesComponents/common/uikit/icons/getOutlineIconById'
import prisma from '../../../prisma/prisma'
import {ClientCategoryData} from '../../../pagesComponents/main-space/model/categoriesAtom'

export default async function getCategories(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		//Сортируем любую выборку категорий одинаково, чтобы было соответствие в отображении: категорий и диаграммы
		const categories = await prisma.category.findMany({
			where: { user: { id: session.user.id } },
			orderBy: { id: 'asc' }, //TODO:newFeature добавить возможность кастомной сортировки
		})

		if (categories.length === 0) {
			sendJsonLeftData<GetCategoriesLeftData>(res, 500, createStandardError('SERVER_ERROR', 'NO_CATEGORIES_FOUND'))
			return
		}

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

		sendJsonRightData<GetCategoriesRightData>(res, remappedCategories)
	}
	catch (error) {
		sendJsonLeftData<GetCategoriesLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}