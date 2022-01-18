import { Either } from '@sweet-monads/either'
import {BackendEitherObject, processBackendEither} from '../common/contracts/BackendEitherObject'
import {
	GetExpensesDataLeftData,
	GetExpensesDataRequestData,
	GetExpensesDataRightData,
} from '../common/contracts/chart/getExpensesDataContract'
import {fetchPostData} from './clientApi'

async function getExpensesData(data: GetExpensesDataRequestData): Promise<Either<GetExpensesDataLeftData, GetExpensesDataRightData>> {
	const response = await fetchPostData('/api/chart/get_expenses_data', data)
	const eitherObject: BackendEitherObject<GetExpensesDataLeftData, GetExpensesDataRightData> = await response.json()
	return processBackendEither(eitherObject)
}

export const chartClientApi = {
	getExpensesData,
}