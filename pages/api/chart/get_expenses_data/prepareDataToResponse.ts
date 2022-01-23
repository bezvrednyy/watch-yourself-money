import {Prisma} from '@prisma/client'
import {
	GetExpensesDataRightData,
	MainCategoryPercentExpenses,
} from '../../../../backFrontJoint/common/contracts/chart/getExpensesDataContract'
import {ColorId} from '../../../../common/colors/colors'
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

	mainExpensesMap.forEach((({id, subcategories, name, money, color}) => {
		percentExpenses.push({
			categoryId: id,
			money: money.toNumber(),
			name,
			colorId: color as ColorId,
			subcategoriesExpenses: subcategories.map(x => ({
				categoryId: x.id,
				name: x.name,
				colorId: x.color as ColorId,
				money: x.money.toNumber(),
			})),
		})
	}))

	return {
		totalAmount: totalAmount.toNumber(),
		mainCategoriesExpenses: percentExpenses,
	}
}