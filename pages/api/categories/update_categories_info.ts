import {OutlineIconId} from '../../../components/icons/getOutlineIconById'
import {ColorId} from '../../../common/colors/colors'
import {CategoryData} from '../../main-space/categoriesSection/model/categoriesAtom'

export type UpdateCategoriesInfoRequest = {
	id: number,
	name: string,
	iconId: OutlineIconId,
	colorId: ColorId,
	newSubcategories: Array<CategoryData>,
	removedSubcategoryIds: Array<string>,
	haveBecomeMainCategoriesIds: Array<string>,
}