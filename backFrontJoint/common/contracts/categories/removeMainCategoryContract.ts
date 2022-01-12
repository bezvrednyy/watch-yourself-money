import {NextApiRequest} from 'next'
import {TextErrorResponse} from '../../errors'

export interface RemoveMainCategoryRequestData {
	categoryId: string,
	removeSubcategories: boolean,
}

export interface RemoveMainCategoryRequest extends NextApiRequest {
	body: {
		data: RemoveMainCategoryRequestData,
	}
}

export type RemoveMainCategoryRightData = void
export type RemoveMainCategoryLeftData = TextErrorResponse