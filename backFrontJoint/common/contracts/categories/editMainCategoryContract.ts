import {CategoryType} from '@prisma/client'
import {NextApiRequest} from 'next'
import {ColorId} from '../../../../common/colors/colors'
import {OutlineIconId} from '../../../../commonClient/uikit/icons/getOutlineIconById'
import {StandardError, TypeErrorResponse} from '../../errors'

//TODO:models
export type EditMainCategoryDefaultCategoryData = {
	id: string,
	title: string,
	iconId: OutlineIconId,
	colorId: ColorId,
	type: CategoryType,
}

export type EditMainCategorySubcategoryData = EditMainCategoryDefaultCategoryData & {
	parentCategoryId?: string,
}


export type EditMainCategoryRequestData = EditMainCategoryDefaultCategoryData & {
	editedSubcategories: Array<EditMainCategorySubcategoryData>,
	newSubcategories: Array<EditMainCategoryDefaultCategoryData>,
	removedSubcategoryIds: Array<string>,
}

export interface EditMainCategoryRequest extends NextApiRequest {
	body: { data: EditMainCategoryRequestData },
}

export type EditMainCategoryErrorType = 'CATEGORY_NOT_FOUND'

export type EditMainCategoryRightData = void
export type EditMainCategoryLeftData = TypeErrorResponse<EditMainCategoryErrorType> | StandardError
