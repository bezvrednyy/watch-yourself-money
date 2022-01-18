import {Prisma} from '@prisma/client'
import {
	GetExpensesDataRightData,
	MainCategoryPercentExpenses,
} from '../../../../backFrontJoint/common/contracts/chart/getExpensesDataContract'
import {MainCategoriesExpensesMap} from './index'

type Args = {
	totalAmount: Prisma.Decimal,
	mainExpensesMap: MainCategoriesExpensesMap,
}

export function prepareDataToResponse({
	totalAmount,
	mainExpensesMap,
}: Args): GetExpensesDataRightData {
	const percentExpenses: Array<MainCategoryPercentExpenses> = []

	mainExpensesMap.forEach((({id, subcategories, name, money}) => {
		percentExpenses.push({
			categoryId: id,
			percent: money.div(totalAmount).toNumber(),
			name: name,
			subcategoriesExpenses: subcategories.map(x => ({
				categoryId: x.id,
				name: x.name,
				percent: x.money.div(money).toNumber(),
			})),
		})
	}))

	return {
		totalAmount: totalAmount.toNumber(),
		mainCategoriesExpenses: percentExpenses,
	}
}