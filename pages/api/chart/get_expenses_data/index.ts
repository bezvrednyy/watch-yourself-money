import {Prisma} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetExpensesDataLeftData,
	GetExpensesDataRightData,
} from '../../../../backFrontJoint/common/contracts/chart/getExpensesDataContract'
import {createStandardError} from '../../../../backFrontJoint/common/errors'
import prisma from '../../../../prisma/prisma'
import {calculateMainCategoriesExpenses} from './calculateMainCategoriesExpenses'
import {prepareDataToResponse} from './prepareDataToResponse'

type CategoryMoneyExpenseData = {
	id: string,
	name: string,
	money: Prisma.Decimal,
}

export type MainCategoryMoneyExpenses = CategoryMoneyExpenseData & {
	subcategories: Array<CategoryMoneyExpenseData>
}

export type MainCategoriesExpensesMap = Map<string, MainCategoryMoneyExpenses>

export default async function getExpensesData(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const allCategoriesData = await prisma.category.findMany({
			where: { userId: session.user.id},
			select: {
				id: true,
				name: true,
				parentCategoryId: true,
			},
		})
		const categoryMoneyAmounts = await prisma.transaction.groupBy({
			by: ['categoryId'],
			where: { category: { userId: session.user.id } },
			_sum: { money: true },
		})
		const data = calculateMainCategoriesExpenses({
			allCategoriesData,
			categoryMoneyMap: new Map<string, Prisma.Decimal>(
				categoryMoneyAmounts.map(x => [x.categoryId, x._sum.money || new Prisma.Decimal(0)]), //TODO:chart. Null в случае..
			),
		})

		sendJsonRightData<GetExpensesDataRightData>(res, prepareDataToResponse(data))
	}
	catch (error) {
		sendJsonLeftData<GetExpensesDataLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}