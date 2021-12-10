import {OutlineIconId} from '../../../../components/icons/getOutlineIconById'

type CategoryData = {
	id: bigint,
	parentCategoryId?: bigint,
	title: string,
	type: number, //0 - расходы, 1 - доходы
	iconId: OutlineIconId,
	hexColor: string,
}

export type {
	CategoryData,
}