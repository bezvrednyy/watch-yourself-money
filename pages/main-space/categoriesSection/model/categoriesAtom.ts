import {createPrimitiveAtom} from '@reatom/core/primitives'
import {ColorId} from '../../../../common/colors/colors'
import {OutlineIconId} from '../../../../components/icons/getOutlineIconById'

type CategoryType = 'EXPENSES'|'INCOMES'

export type CategoryData = {
	id: number,
	parentCategoryId?: number,
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	colorId: ColorId,
}

export const categoriesAtom = createPrimitiveAtom<Array<CategoryData>>([])
export const editableCategoryIdAtom = createPrimitiveAtom(<null|number>(null))