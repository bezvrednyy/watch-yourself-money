import {NextApiRequest} from 'next'
import {ColorId} from '../../../../common/colors/colors'
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
	colorId: ColorId,
}

export type MainCategoryPercentExpenses = CategoryPercentExpenses & {
	subcategoriesExpenses: Array<CategoryPercentExpenses>
}

export type GetExpensesDataRightData = {
	totalAmount: number,
	mainCategoriesExpenses: Array<MainCategoryPercentExpenses>,
}
export type GetExpensesDataLeftData = StandardError