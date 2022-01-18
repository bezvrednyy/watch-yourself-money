import {Prisma} from '@prisma/client'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetExpensesDataLeftData,
	GetExpensesDataRequest,
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

export default async function getExpensesData(req: GetExpensesDataRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const {startDate, endDate} = req.body.data

		//TODO:bd, закинуть запросы в транзакцию и накинуть соответствующие правила, блокировки.
		const allCategoriesData = await prisma.category.findMany({
			where: {
				userId: session.user.id,
				transactions: { some: { date: {
					gte: startDate,
					lte: endDate,
				}}},
			},
			select: {
				id: true,
				name: true,
				parentCategoryId: true,
			},
		})
		const categoryMoneyAmounts = await prisma.transaction.groupBy({
			by: ['categoryId'],
			where: {
				category: { userId: session.user.id },
				date: { gte: startDate, lte: endDate },
			},
			_sum: { money: true },
		})
		console.log(categoryMoneyAmounts)
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