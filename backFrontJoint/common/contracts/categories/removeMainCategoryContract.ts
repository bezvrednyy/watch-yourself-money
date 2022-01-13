import {NextApiRequest} from 'next'
import {TextErrorResponse, TypeErrorResponse} from '../../errors'

export interface RemoveMainCategoryRequestData {
	categoryId: string,
	removeSubcategories: boolean,
}

export interface RemoveMainCategoryRequest extends NextApiRequest {
	body: {
		data: RemoveMainCategoryRequestData,
	}
}


export type RemoveMainCategoryErrorType = 'CATEGORY_NOT_FOUND'
	|'NOT_ENOUGH_RIGHTS'
	|'IS_IT_SUBCATEGORY'
	|'NO_MAIN_CATEGORIES_FOUND'
	|'LAST_MAIN_CATEGORY'

export type RemoveMainCategoryRightData = void
export type RemoveMainCategoryLeftData = TypeErrorResponse<RemoveMainCategoryErrorType> | TextErrorResponse