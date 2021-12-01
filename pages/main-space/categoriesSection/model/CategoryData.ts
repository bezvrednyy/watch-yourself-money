import {OutlineIconId} from '../../../../components/icons/getOutlineIconById'

type CategoryData = {
	id: string,
	parentCategoryId?: string,
	title: string,
	type: number, //0 - расходы, 1 - доходы
	iconId: OutlineIconId,
	hexColor: string,
}

export type {
	CategoryData,
}