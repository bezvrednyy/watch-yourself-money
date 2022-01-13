import {NextApiRequest} from 'next'
import {ServerError, TypeErrorResponse} from '../../errors'

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
	|'LAST_MAIN_CATEGORY'

export type RemoveMainCategoryRightData = void
export type RemoveMainCategoryLeftData = TypeErrorResponse<RemoveMainCategoryErrorType> | ServerError