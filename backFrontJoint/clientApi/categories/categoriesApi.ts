import {
	CreateCategoryLeftData,
	CreateCategoryRequestData,
	CreateCategoryRightData,
} from '../../contracts/categories/createCategoryContract'
import {BackendEitherObject, processBackendEither} from '../../contracts/BackendEitherObject'
import {fetchPostData} from '../clientApi'
import {Either} from '@sweet-monads/either'

type BackendEitherData = BackendEitherObject<CreateCategoryLeftData, CreateCategoryRightData>

export async function createCategoryApi(data: CreateCategoryRequestData): Promise<Either<CreateCategoryLeftData, CreateCategoryRightData>> {
	const response = await fetchPostData('/api/categories/create_category', data)
	const eitherObject: BackendEitherData = await response.json()
	return processBackendEither(eitherObject)
}