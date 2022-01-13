import {NextApiRequest} from 'next'
import {ClientCategoryData} from '../../../../pages/main-space/model/categoriesAtom'
import {ServerError} from '../../errors'

//TODO:models
export interface CreateCategoryRequestData extends ClientCategoryData {
	subcategories: Array<ClientCategoryData>,
}

export interface CreateCategoryRequest extends NextApiRequest {
	method: 'POST',
	body: {
		data: CreateCategoryRequestData,
	}
}

export type CreateCategoryRightData = void
export type CreateCategoryLeftData = ServerError