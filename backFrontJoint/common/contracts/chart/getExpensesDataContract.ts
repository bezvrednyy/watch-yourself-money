import {NextApiRequest} from 'next'
import {StandardError} from '../../errors'

export type GetExpensesDataRequestData = {
	startDate: Date,
	endDate: Date,
}

export interface GetExpensesDataRequest extends NextApiRequest {
	body: { data: GetExpensesDataRequestData },
}


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