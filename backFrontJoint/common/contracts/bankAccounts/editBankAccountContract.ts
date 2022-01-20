import {NextApiRequest} from 'next'
import {StandardError} from '../../errors'

export type EditBankAccountRequestData = {
	id: string,
	name: string,
}

export interface EditBankAccountRequest extends NextApiRequest {
	body: { data: EditBankAccountRequestData }
}

export type EditBankAccountRightData = void
export type EditBankAccountLeftData = StandardError