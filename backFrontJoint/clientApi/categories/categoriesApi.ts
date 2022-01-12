import {
	CreateCategoryLeftData,
	CreateCategoryRequestData,
	CreateCategoryRightData,
} from '../../common/contracts/categories/createCategoryContract'
import {BackendEitherObject, processBackendEither} from '../../common/contracts/BackendEitherObject'
import {GetCategoriesLeftData, GetCategoriesRightData} from '../../common/contracts/categories/getCategoriesContract'
import {
	RemoveMainCategoryLeftData,
	RemoveMainCategoryRequestData,
	RemoveMainCategoryRightData,
} from '../../common/contracts/categories/removeMainCategoryContract'
import {fetchPostData} from '../clientApi'
import {Either} from '@sweet-monads/either'

async function createCategory(data: CreateCategoryRequestData): Promise<Either<CreateCategoryLeftData, CreateCategoryRightData>> {
	const response = await fetchPostData('/api/categories/create_category', data)
	const eitherObject: BackendEitherObject<CreateCategoryLeftData, CreateCategoryRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function getCategories(): Promise<Either<GetCategoriesLeftData, GetCategoriesRightData>> {
	const response = await fetch('/api/categories/get_categories')
	const eitherObject: BackendEitherObject<GetCategoriesLeftData, GetCategoriesRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function removeMainCategory(data: RemoveMainCategoryRequestData): Promise<Either<RemoveMainCategoryLeftData, RemoveMainCategoryRightData>> {
	//TODO:clientApi, нужно настроить методы: PUT, POST, DELETE
	const response = await fetchPostData('/api/categories/remove_main_category', data)
	const eitherObject: BackendEitherObject<RemoveMainCategoryLeftData, RemoveMainCategoryRightData> = await response.json()
	return processBackendEither(eitherObject)
}

export const categoriesClientApi = {
	createCategory,
	getCategories,
	removeMainCategory,
}