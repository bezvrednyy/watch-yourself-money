import {CategoryType} from '@prisma/client'
import {NextApiRequest} from 'next'
import {ColorId} from '../../../../common/colors/colors'
import {OutlineIconId} from '../../../../commonClient/uikit/icons/getOutlineIconById'
import {CategoryData} from '../../../../pages/main-space/model/categoriesAtom'
import {TextErrorResponse} from '../../errors'

export type EditMainCategoryRequestData = {
	id: string,
	name: string,
	iconId: OutlineIconId,
	colorId: ColorId,
	type: CategoryType,
	editedSubcategories: Array<CategoryData>,
	newSubcategories: Array<CategoryData>,
	removedSubcategoryIds: Array<string>,
}

export interface EditMainCategoryRequest extends NextApiRequest {
	body: {
		data: EditMainCategoryRequestData,
	},
}

export type EditMainCategoryRightData = void
export type EditMainCategoryLeftData = TextErrorResponse
