import {NextApiRequest} from 'next'
import {StandardError, TypeErrorResponse} from '../../errors'

export type RemoveBankAccountRequestData = {
	id: string,
	movingTransactionsAccountId?: string,
}

export interface RemoveBankAccountRequest extends NextApiRequest {
	body: { data: RemoveBankAccountRequestData }
}

export type RemoveBankAccountErrorType = 'BANK_ACCOUNT_NOT_FOUND'
	|'LAST_BANK_ACCOUNT'
	|'ACCOUNT_FOR_MOVING_TRANSACTIONS_NOT_FOUND'

export type RemoveBankAccountRightData = void
export type RemoveBankAccountLeftData = TypeErrorResponse<RemoveBankAccountErrorType>
	|StandardError