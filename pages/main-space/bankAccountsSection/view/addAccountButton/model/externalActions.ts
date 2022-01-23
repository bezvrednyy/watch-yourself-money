import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {isNumber} from '../../../../../../common/utils/number'
import {removeSpaces, trimAll} from '../../../../../../common/utils/string'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {updateBankAccountsAction} from '../../../../model/bankAccountsAtom'
import {addAccountButtonAtoms} from './addAccountButtonAtoms'

type CreateBankAccountPayload = {
	name: string,
	balance: string,
}

export const createBankAccountAction = declareAloneAction(async (store, {
	name,
	balance,
}: CreateBankAccountPayload) => {
	const {statusesAtom, errorsSetAtom} = addAccountButtonAtoms
	let hasError = false
	const stringNumber = removeSpaces(balance)
	const preparedName = trimAll(name)
	if (!isNumber(stringNumber)) {
		store.dispatch(errorsSetAtom.addError('invalidBalance'))
		hasError = true
	}
	if (!preparedName) {
		store.dispatch(errorsSetAtom.addError('invalidName'))
		hasError = true
	}
	if (hasError) return

	store.dispatch(statusesAtom.setSaving())
	const either = await getClientApi().bankAccounts.createBankAccount({
		name: preparedName,
		money: Number(stringNumber),
	})
	either
		.mapRight(async () => {
			await updateBankAccountsAction(store)
			store.dispatch(statusesAtom.setNormal())
		})
		.mapLeft(processStandardError)

})