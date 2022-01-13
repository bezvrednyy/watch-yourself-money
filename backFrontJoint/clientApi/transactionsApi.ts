import {Either} from '@sweet-monads/either'
import {BackendEitherObject, processBackendEither} from '../common/contracts/BackendEitherObject'
import {
	CreateTransactionLeftData,
	CreateTransactionRequestData,
	CreateTransactionRightData,
} from '../common/contracts/transactions/createTransactionContract'
import {fetchPostData} from './clientApi'

async function createTransaction(data: CreateTransactionRequestData): Promise<Either<CreateTransactionLeftData, CreateTransactionRightData>> {
	const response = await fetchPostData('/api/transactions/create_transaction', data)
	const eitherObject: BackendEitherObject<CreateTransactionLeftData, CreateTransactionRightData> = await response.json()
	return processBackendEither(eitherObject)
}

export const transactionsClientApi = {
	createTransaction,
}