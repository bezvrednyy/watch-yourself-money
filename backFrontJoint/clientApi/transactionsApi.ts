import {Either} from '@sweet-monads/either'
import {BackendEitherObject, processBackendEither} from '../common/contracts/BackendEitherObject'
import {GetExpensesDataRequestData} from '../common/contracts/chart/getExpensesDataContract'
import {
	CreateTransactionLeftData,
	CreateTransactionRequestData,
	CreateTransactionRightData,
} from '../common/contracts/transactions/createTransactionContract'
import {
	EditTransactionLeftData,
	EditTransactionRequestData,
	EditTransactionRightData,
} from '../common/contracts/transactions/editTransactionContract'
import {
	GetTransactionsLeftData,
	GetTransactionsRightData,
} from '../common/contracts/transactions/getTransactionsContract'
import {
	RemoveTransactionLeftData,
	RemoveTransactionRequestData,
	RemoveTransactionRightData,
} from '../common/contracts/transactions/removeTransactionContract'
import {fetchPostData} from './clientApi'

async function createTransaction(data: CreateTransactionRequestData): Promise<Either<CreateTransactionLeftData, CreateTransactionRightData>> {
	const response = await fetchPostData('/api/transactions/create_transaction', data)
	const eitherObject: BackendEitherObject<CreateTransactionLeftData, CreateTransactionRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function getTransactions(data: GetExpensesDataRequestData): Promise<Either<GetTransactionsLeftData, GetTransactionsRightData>> {
	const response = await fetchPostData('/api/transactions/get_transactions', data)
	const eitherObject: BackendEitherObject<GetTransactionsLeftData, GetTransactionsRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function removeTransaction(data: RemoveTransactionRequestData): Promise<Either<RemoveTransactionLeftData, RemoveTransactionRightData>> {
	const response = await fetchPostData('/api/transactions/remove_transaction', data)
	const eitherObject: BackendEitherObject<RemoveTransactionLeftData, RemoveTransactionRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function editTransaction(data: EditTransactionRequestData): Promise<Either<EditTransactionLeftData, EditTransactionRightData>> {
	const response = await fetchPostData('/api/transactions/edit_transaction', data)
	const eitherObject: BackendEitherObject<EditTransactionLeftData, EditTransactionRightData> = await response.json()
	return processBackendEither(eitherObject)
}

export const transactionsClientApi = {
	createTransaction,
	getTransactions,
	removeTransaction,
	editTransaction,
}