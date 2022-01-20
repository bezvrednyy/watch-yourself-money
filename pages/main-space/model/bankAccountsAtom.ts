import {createPrimitiveAtom} from '@reatom/core/primitives'

export type BankAccountData = {
	id: string,
	name: string,
	userId: string,
	money: number,
}

export const bankAccountsAtom = createPrimitiveAtom<Array<BankAccountData>>([])