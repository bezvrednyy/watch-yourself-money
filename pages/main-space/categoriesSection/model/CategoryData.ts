import {OutlineIconId} from '../../../../components/icons/getOutlineIconById'

type CategoryType = 'EXPENSES'|'INCOMES'

type CategoryData = {
	id: string,
	parentCategoryId?: bigint,
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	hexColor: string,
}

export type {
	CategoryData,
}