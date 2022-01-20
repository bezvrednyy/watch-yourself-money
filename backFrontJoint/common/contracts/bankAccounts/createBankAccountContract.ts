import {NextApiRequest} from 'next'
import {StandardError} from '../../errors'

export type CreateBankAccountRequestData = {
	name: string,
	money: number,
}

export interface CreateBankAccountRequest extends NextApiRequest {
	body: { data: CreateBankAccountRequestData }
}

export type CreateBankAccountRightData = void
export type CreateBankAccountLeftData = StandardError