import {NextApiRequest} from 'next'
import {CategoryData} from '../../../../pages/main-space/model/categoriesAtom'
import {TextErrorResponse} from '../../errors'

export interface CreateCategoryRequestData extends CategoryData {
	subcategories: Array<CategoryData>,
}

export interface CreateCategoryRequest extends NextApiRequest {
	method: 'POST',
	body: {
		data: CreateCategoryRequestData,
	}
}

export type CreateCategoryRightData = void
export type CreateCategoryLeftData = TextErrorResponse