import {ColorId} from '../../../../common/colors/colors'
import {OutlineIconId} from '../../../../commonClient/uikit/icons/getOutlineIconById'
import {ServerError} from '../../errors'

type GetCategoriesRequest = void

export type GetCategoriesCategoryData = {
	id: string,
	parentCategoryId?: string,
	title: string,
	type: 'EXPENSES'|'INCOMES',
	iconId: OutlineIconId,
	colorId: ColorId,
}

export type GetCategoriesRightData = {
	categories: Array<GetCategoriesCategoryData>,
}
export type GetCategoriesLeftData = ServerError