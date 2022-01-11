import {NextApiRequest} from 'next'
import {CategoryData} from '../../../pages/main-space/model/categoriesAtom'

export interface CreateCategoryRequestData extends CategoryData {
	subcategories: Array<CategoryData>,
}

export interface CreateCategoryRequest extends NextApiRequest {
	body: {
		data: CreateCategoryRequestData,
	}
}

export type CreateCategoryRightData = void
export type CreateCategoryLeftData = unknown