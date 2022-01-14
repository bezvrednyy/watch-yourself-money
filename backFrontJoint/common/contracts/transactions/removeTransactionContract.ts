import {NextApiRequest} from 'next'
import {StandardError, TypeErrorResponse} from '../../errors'

export type RemoveTransactionRequestData = {
	transactionId: string,
}

export interface RemoveTransactionRequest extends NextApiRequest {
	body: { data: RemoveTransactionRequestData },
}

export type RemoveTransactionErrorType = 'TRANSACTION_NOT_FOUND'

export type RemoveTransactionRightData = void
export type RemoveTransactionLeftData = TypeErrorResponse<RemoveTransactionErrorType> | StandardError