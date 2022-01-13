import {createPrimitiveAtom} from '@reatom/core/primitives'
import {ColorId} from '../../../common/colors/colors'
import {OutlineIconId} from '../../../commonClient/uikit/icons/getOutlineIconById'

type CategoryType = 'EXPENSES'|'INCOMES'

export type ClientCategoryData = {
	id: string,
	parentCategoryId?: string,
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	colorId: ColorId,
}

export type MainCategoryData = ClientCategoryData & {
	parentCategoryId: undefined,
}

export type SubCategoryData = ClientCategoryData & {
	parentCategoryId: string,
}

type CategoriesAtomData = {
	mainCategories: Array<MainCategoryData>,
	subCategories: Array<SubCategoryData>,
}

export const categoriesAtom = createPrimitiveAtom<CategoriesAtomData>({
	mainCategories: [],
	subCategories: [],
})
export const editableCategoryIdAtom = createPrimitiveAtom(<null|string>(null))