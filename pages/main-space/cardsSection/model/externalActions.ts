import {getClientApi, processStandardError} from '../../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../../commonClient/declareAloneAction'
import {updateBankAccountsAction} from '../../model/bankAccountsAtom'
import {addAccountButtonAtoms} from './addAccountButtonAtoms'

const createBankCard = declareAloneAction(async store => {
	const {statusesAtom, nameAtom, balanceAtom} = addAccountButtonAtoms
	store.dispatch(statusesAtom.setSaving())
	//TODO:cash Провалидировать, убрать от лишних пробелов и сохранить данные.
	const name = store.getState(nameAtom)
	const money = Number(store.getState(balanceAtom))

	const either = await getClientApi().bankAccounts.createBankAccount({
		name,
		money,
	})
	either
		.mapRight(async () => {
			await updateBankAccountsAction(store)
			store.dispatch(statusesAtom.setNormal())
		})
		.mapLeft(processStandardError)

})

export const cardsSectionExternalActions = {
	createBankCard,
}