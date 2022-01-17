import {StandardError} from '../../errors'

export type PercentInfo = {
	categoryId: string,
	percent: number,
}

export type MainCategoriesExpensesData = Array<PercentInfo & {
	subcategoriesData: Array<PercentInfo>
}>

export type GetExpensesDataRightData = {
	totalAmount: number,
	mainCategoriesData: MainCategoriesExpensesData,
}
export type GetExpensesDataLeftData = StandardError