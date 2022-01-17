import { Either } from '@sweet-monads/either'
import {BackendEitherObject, processBackendEither} from '../common/contracts/BackendEitherObject'
import {GetExpensesDataLeftData, GetExpensesDataRightData} from '../common/contracts/chart/getExpensesDataContract'

async function getExpensesData(): Promise<Either<GetExpensesDataLeftData, GetExpensesDataRightData>> {
	const response = await fetch('/api/chart/get_expenses_data')
	const eitherObject: BackendEitherObject<GetExpensesDataLeftData, GetExpensesDataRightData> = await response.json()
	return processBackendEither(eitherObject)
}

export const chartClientApi = {
	getExpensesData,
}