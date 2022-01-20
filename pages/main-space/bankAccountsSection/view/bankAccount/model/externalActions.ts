import toast from 'react-hot-toast'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {updateBankAccountsAction} from '../../../../model/bankAccountsAtom'
import {updateMainSpaceDataAction} from '../../../../model/updateMainSpaceDataAction'

type EditBankAccountPayload = {
	id: string,
	name: string,
}

export const editBankAccountAction = declareAloneAction(async (store, payload: EditBankAccountPayload) => {
	const either = await getClientApi().bankAccounts.editBankAccount({
		id: payload.id,
		name: payload.name,
	})
	either
		.mapRight(async () => {
			updateBankAccountsAction(store)
		})
		.mapLeft(error => {
			if (error.type === 'BANK_ACCOUNT_NOT_FOUND') {
				toast.error('Данный счёт не найден.')
				updateMainSpaceDataAction(store)
				return
			}
			processStandardError(error)
		})

})