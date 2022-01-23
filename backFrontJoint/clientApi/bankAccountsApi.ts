import {Either} from '@sweet-monads/either'
import {BackendEitherObject, processBackendEither} from '../common/contracts/BackendEitherObject'
import {
	CreateBankAccountLeftData,
	CreateBankAccountRequestData,
	CreateBankAccountRightData,
} from '../common/contracts/bankAccounts/createBankAccountContract'
import {
	EditBankAccountLeftData,
	EditBankAccountRequestData,
	EditBankAccountRightData,
} from '../common/contracts/bankAccounts/editBankAccountContract'
import {GetBankAccountLeftData, GetBankAccountRightData} from '../common/contracts/bankAccounts/getBankAccountsContract'
import {
	RemoveBankAccountLeftData,
	RemoveBankAccountRequestData,
	RemoveBankAccountRightData,
} from '../common/contracts/bankAccounts/removeBankAccountContract'
import {fetchPostData} from './clientApi'

async function createBankAccount(data: CreateBankAccountRequestData): Promise<Either<CreateBankAccountLeftData, CreateBankAccountRightData>> {
	const response = await fetchPostData('/api/bank_accounts/create_bank_account', data)
	const eitherObject: BackendEitherObject<CreateBankAccountLeftData, CreateBankAccountRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function getBankAccounts(): Promise<Either<GetBankAccountLeftData, GetBankAccountRightData>> {
	const response = await fetch('/api/bank_accounts/get_bank_accounts')
	const eitherObject: BackendEitherObject<GetBankAccountLeftData, GetBankAccountRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function removeBankAccount(data: RemoveBankAccountRequestData): Promise<Either<RemoveBankAccountLeftData, RemoveBankAccountRightData>> {
	const response = await fetchPostData('/api/bank_accounts/remove_bank_account', data)
	const eitherObject: BackendEitherObject<RemoveBankAccountLeftData, RemoveBankAccountRightData> = await response.json()
	return processBackendEither(eitherObject)
}

async function editBankAccount(data: EditBankAccountRequestData): Promise<Either<EditBankAccountLeftData, EditBankAccountRightData>> {
	const response = await fetchPostData('/api/bank_accounts/edit_bank_account', data)
	const eitherObject: BackendEitherObject<EditBankAccountLeftData, EditBankAccountRightData> = await response.json()
	return processBackendEither(eitherObject)
}

export const bankAccountsApi = {
	createBankAccount,
	getBankAccounts,
	removeBankAccount,
	editBankAccount,
}