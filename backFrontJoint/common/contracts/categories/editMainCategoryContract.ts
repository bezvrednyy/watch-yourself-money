import {CategoryType} from '@prisma/client'
import {NextApiRequest} from 'next'
import {ColorId} from '../../../../common/colors/colors'
import {OutlineIconId} from '../../../../commonClient/uikit/icons/getOutlineIconById'
import {ClientCategoryData} from '../../../../pages/main-space/model/categoriesAtom'
import {StandardError} from '../../errors'

//TODO:models
export type EditMainCategoryRequestData = {
	id: string,
	name: string,
	iconId: OutlineIconId,
	colorId: ColorId,
	type: CategoryType,
	editedSubcategories: Array<ClientCategoryData>,
	newSubcategories: Array<ClientCategoryData>,
	removedSubcategoryIds: Array<string>,
}

export interface EditMainCategoryRequest extends NextApiRequest {
	body: {
		data: EditMainCategoryRequestData,
	},
}

export type EditMainCategoryRightData = void
export type EditMainCategoryLeftData = StandardError
