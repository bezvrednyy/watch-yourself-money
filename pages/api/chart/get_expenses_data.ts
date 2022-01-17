import {Prisma} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetExpensesDataLeftData,
	GetExpensesDataRightData,
} from '../../../backFrontJoint/common/contracts/chart/getExpensesDataContract'
import {createStandardError} from '../../../backFrontJoint/common/errors'
import {verify} from '../../../common/utils/verify'
import prisma from '../../../prisma/prisma'

type SubcategoryExpenseData = {
	id: string,
	money: Prisma.Decimal,
}

type MainCategoriesExpenseData = {
	money: Prisma.Decimal,
	subcategories: Array<SubcategoryExpenseData>
}

export default async function getExpensesData(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	try {
		const categoriesData = await prisma.category.findMany({
			where: { userId: session.user.id},
			select: {
				id: true,
				parentCategoryId: true,
			},
		})
		const categoriesMap = new Map<string, string|null>(
			categoriesData.map(x => [x.id, x.parentCategoryId]),
		)

		const amountData = await prisma.transaction.groupBy({
			by: ['categoryId'],
			where: { category: { userId: session.user.id } },
			_sum: {
				money: true,
			},
		})

		const totalAmount = new Prisma.Decimal(0)
		const mainExpensesMap = new Map<string, MainCategoriesExpenseData>()

		for (const categoryTransactions of amountData) {
			const categoryId = categoryTransactions.categoryId
			const categoryMoney = verify(categoryTransactions._sum.money)
			totalAmount.plus(categoryMoney)

			const parentCategoryId = categoriesMap.get(categoryId)
			if (parentCategoryId === undefined) {
				sendJsonLeftData<GetExpensesDataLeftData>(res, 500, createStandardError('SERVER_ERROR', 'categoryId foreign key error'))
				return
			}
			if (parentCategoryId === null) {
				const mainCategory = mainExpensesMap.get(categoryId)
				if (mainCategory) {
					mainCategory.money.plus(categoryMoney)
				}
				else {
					mainExpensesMap.set(categoryId, {
						money: categoryMoney,
						subcategories: [],
					})
				}
			}
			else {
				//TODO:Разбить на функции, попробовать высчитывать процент динамический
				const mainCategory = mainExpensesMap.get(parentCategoryId)
				if (mainCategory) {
					mainCategory.money.plus(categoryMoney)
					mainCategory.subcategories.push({
						id: categoryId,
						money: categoryMoney,
					})
				}
				else {
					mainExpensesMap.set(categoryId, {
						money: categoryMoney,
						subcategories: [{
							id: categoryId,
							money: categoryMoney,
						}],
					})
				}
			}
		}

		sendJsonRightData<GetExpensesDataRightData>(res, {
			totalAmount: totalAmount.toNumber(),
			mainCategoriesData,
		})
	}
	catch (error) {
		sendJsonLeftData<GetExpensesDataLeftData>(res, 500, createStandardError('SERVER_ERROR', error))
	}
}