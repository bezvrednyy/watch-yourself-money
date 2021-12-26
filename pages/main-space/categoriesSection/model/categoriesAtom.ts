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

export type MainCategoryData = CategoryData & {
	parentCategoryId: undefined,
}

export type SubCategoryData = CategoryData & {
	parentCategoryId: number,
}

type CategoriesAtomData = {
	mainCategories: Array<MainCategoryData>,
	subCategories: Array<SubCategoryData>,
}

export const categoriesAtom = createPrimitiveAtom<CategoriesAtomData>({
	mainCategories: [],
	subCategories: [],
})
export const editableCategoryIdAtom = createPrimitiveAtom(<null|number>(null))