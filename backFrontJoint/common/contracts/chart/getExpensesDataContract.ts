import {StandardError} from '../../errors'

type CategoryPercentExpenses = {
	categoryId: string,
	name: string,
	money: number,
}

export type MainCategoryPercentExpenses = CategoryPercentExpenses & {
	subcategoriesExpenses: Array<CategoryPercentExpenses>
}

export type GetExpensesDataRightData = {
	totalAmount: number,
	mainCategoriesExpenses: Array<MainCategoryPercentExpenses>,
}
export type GetExpensesDataLeftData = StandardError