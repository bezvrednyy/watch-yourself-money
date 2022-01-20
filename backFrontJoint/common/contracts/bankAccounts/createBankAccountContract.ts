import {NextApiRequest} from 'next'
import {StandardError} from '../../errors'

export type CreateBankAccountRequestData = {
	id: string,
	name: string,
	money: number,
}

export interface CreateBankAccountRequest extends NextApiRequest {
	body: { data: CreateBankAccountRequestData }
}

export type CreateBankAccountRightData = void
export type CreateBankAccountLeftData = StandardError