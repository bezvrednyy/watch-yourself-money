import {
	CreateCategoryLeftData,
	CreateCategoryRequestData,
	CreateCategoryRightData,
} from '../../common/contracts/categories/createCategoryContract'
import {BackendEitherObject, processBackendEither} from '../../common/contracts/BackendEitherObject'
import {fetchPostData} from '../clientApi'
import {Either} from '@sweet-monads/either'

type BackendEitherData = BackendEitherObject<CreateCategoryLeftData, CreateCategoryRightData>

async function createCategory(data: CreateCategoryRequestData): Promise<Either<CreateCategoryLeftData, CreateCategoryRightData>> {
	const response = await fetchPostData('/api/categories/create_category', data)
	const eitherObject: BackendEitherData = await response.json()
	return processBackendEither(eitherObject)
}

async function getCategories(): Promise<Either<CreateCategoryLeftData, CreateCategoryRightData>> {
	const response = await fetch('/api/categories/get_categories')
	const eitherObject: BackendEitherData = await response.json()
	return processBackendEither(eitherObject)
}

export const categoriesClientApi = {
	createCategory,
	getCategories,
}