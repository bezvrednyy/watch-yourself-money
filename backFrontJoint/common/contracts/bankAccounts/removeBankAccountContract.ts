import {NextApiRequest} from 'next'
import {StandardError} from '../../errors'

export type RemoveBankAccountRequestData = {
	id: string,
}

export interface RemoveBankAccountRequest extends NextApiRequest {
	body: { data: RemoveBankAccountRequestData }
}

export type RemoveBankAccountRightData = void
export type RemoveBankAccountLeftData = StandardError