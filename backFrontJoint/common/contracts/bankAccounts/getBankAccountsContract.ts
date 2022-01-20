import {StandardError} from '../../errors'

export type GetBankAccountData = {
	id: string,
	userId: string
	name: string,
	money: number,
}

export type GetBankAccountRightData = Array<GetBankAccountData>
export type GetBankAccountLeftData = StandardError