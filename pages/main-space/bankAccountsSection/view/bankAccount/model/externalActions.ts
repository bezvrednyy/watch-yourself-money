import toast from 'react-hot-toast'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {StandardError} from '../../../../../../backFrontJoint/common/errors'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {updateBankAccountsAction} from '../../../../model/bankAccountsAtom'
import {updateMainSpaceDataAction} from '../../../../model/updateMainSpaceDataAction'
import {removeBankAccountPopupAtoms} from './removeBankAccountPopupAtoms'

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

type RemoveBankAccountPayload = {
	id: string,
	movingTransactionsAccountId?: string,
}

export const removeBankAccountAction = declareAloneAction(async (store, payload: RemoveBankAccountPayload) => {
	const {statusesAtom, removableBankAccountIdAtom} = removeBankAccountPopupAtoms
	const close = () => store.dispatch(removableBankAccountIdAtom.set(null))
	store.dispatch(statusesAtom.setSaving())
	const either = await getClientApi().bankAccounts.removeBankAccount({
		id: payload.id,
		movingTransactionsAccountId: payload.movingTransactionsAccountId,
	})
	either
		.mapRight(async () => {
			await updateBankAccountsAction(store)
			store.dispatch(statusesAtom.setNormal())
			close()
		})
		.mapLeft(error => {
			if (error.type === 'BANK_ACCOUNT_NOT_FOUND') {
				toast.error('Данный счёт не найден.')
				close()
				updateMainSpaceDataAction(store)
				return
			}
			if (error.type === 'LAST_BANK_ACCOUNT') {
				toast.error('Последний счёт нельзя удалить')
				close()
				updateMainSpaceDataAction(store)
				return
			}
			if (error.type === 'ACCOUNT_FOR_MOVING_TRANSACTIONS_NOT_FOUND') {
				toast.error('Не найден счёт, указанный для перемещения транзакций')
				updateMainSpaceDataAction(store)
				return
			}
			processStandardError(error as StandardError)
		})
})