import {createPrimitiveAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../components/icons/getOutlineIconById'

type CategoryType = 'EXPENSES'|'INCOMES'

export type CategoryData = {
	id: number,
	parentCategoryId?: number,
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	hexColor: string,
}

export const categoriesAtom = createPrimitiveAtom<Array<CategoryData>>([])
export const editableCategoryIdAtom = createPrimitiveAtom(<null|number>(null))