import {CategoryType} from '@prisma/client'
import {NextApiRequest} from 'next'
import {ColorId} from '../../../../common/colors/colors'
import {OutlineIconId} from '../../../../pagesComponents/common/uikit/icons/getOutlineIconById'
import {ClientCategoryData} from '../../../../pagesComponents/main-space/model/categoriesAtom'
import {StandardError} from '../../errors'

//TODO:models
export type CreateCategoryRequestData = {
	id: string,
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	colorId: ColorId,
	subcategories: Array<ClientCategoryData>,
}

export interface CreateCategoryRequest extends NextApiRequest {
	body: { data: CreateCategoryRequestData }
}

export type CreateCategoryRightData = void
export type CreateCategoryLeftData = StandardError