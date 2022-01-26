import {createPrimitiveAtom} from '@reatom/core/primitives'
import {getClientApi, processStandardError} from '../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../common/declareAloneAction'

export type BankAccountData = {
	id: string,
	name: string,
	userId: string,
	money: number,
}

export const bankAccountsAtom = createPrimitiveAtom<Array<BankAccountData>>([])

export const updateBankAccountsAction = declareAloneAction(async store => {
	const either = await getClientApi().bankAccounts.getBankAccounts()
	either
		.mapRight(data => store.dispatch(bankAccountsAtom.set(data)))
		.mapLeft(processStandardError)
})