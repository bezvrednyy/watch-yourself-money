import {NextApiRequest} from 'next'
import {StandardError, TypeErrorResponse} from '../../errors'

export type EditBankAccountRequestData = {
	id: string,
	name: string,
}

export interface EditBankAccountRequest extends NextApiRequest {
	body: { data: EditBankAccountRequestData }
}

export type EditBankAccountErrorType = 'BANK_ACCOUNT_NOT_FOUND'

export type EditBankAccountRightData = void
export type EditBankAccountLeftData = TypeErrorResponse<EditBankAccountErrorType>
	|StandardError