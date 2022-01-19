import {createPrimitiveAtom} from '@reatom/core/primitives'
import {ColorId} from '../../../common/colors/colors'

export type BankAccountData = {
	id: string,
	name: string,
	colorId: ColorId,
	userId: string,
	money: number,
}

export const bankAccountsAtom = createPrimitiveAtom<Array<BankAccountData>>([])