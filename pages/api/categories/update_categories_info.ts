import {OutlineIconId} from '../../../components/icons/getOutlineIconById'
import {ColorId} from '../../../common/colors/colors'
import {CategoryData} from '../../main-space/categoriesSection/model/categoriesAtom'

export type UpdateCategoriesInfoRequest = {
	id: number,
	name: string,
	iconId: OutlineIconId,
	colorId: ColorId,
	editedSubcategories: Array<CategoryData>,
	newSubcategories: Array<CategoryData>,
	removedSubcategoryIds: Array<number>,
	haveBecomeMainCategoriesIds: Array<number>,
}