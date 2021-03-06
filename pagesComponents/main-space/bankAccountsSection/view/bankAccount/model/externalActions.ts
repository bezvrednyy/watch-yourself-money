import toast from 'react-hot-toast'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {StandardError} from '../../../../../../backFrontJoint/common/errors'
import {verify} from '../../../../../../common/utils/verify'
import {declareAloneAction} from '../../../../../common/declareAloneAction'
import {updateBankAccountsAction} from '../../../../model/bankAccountsAtom'
import {simultaneousUpdateMainSpaceDataAction} from '../../../../model/asyncUpdateMainSpaceDataAction'
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
				simultaneousUpdateMainSpaceDataAction(store)
				return
			}
			processStandardError(error)
		})
})

export const removeBankAccountAction = declareAloneAction(async store => {
	const {statusesAtom, removableBankAccountIdAtom, movingTransactionsAccountIdAtom} = removeBankAccountPopupAtoms
	const close = () => store.dispatch(removableBankAccountIdAtom.set(null))
	store.dispatch(statusesAtom.setRemoving())
	const either = await getClientApi().bankAccounts.removeBankAccount({
		id: verify(store.getState(removableBankAccountIdAtom)),
		movingTransactionsAccountId: store.getState(movingTransactionsAccountIdAtom) || undefined,
	})
	either
		.mapRight(async () => {
			await simultaneousUpdateMainSpaceDataAction(store)
			store.dispatch(statusesAtom.setNormal())
			close()
		})
		.mapLeft(error => {
			if (error.type === 'BANK_ACCOUNT_NOT_FOUND') {
				toast.error('Данный счёт не найден.')
				close()
				simultaneousUpdateMainSpaceDataAction(store)
				return
			}
			if (error.type === 'LAST_BANK_ACCOUNT') {
				toast.error('Последний счёт нельзя удалить')
				close()
				simultaneousUpdateMainSpaceDataAction(store)
				return
			}
			if (error.type === 'ACCOUNT_FOR_MOVING_TRANSACTIONS_NOT_FOUND') {
				toast.error('Не найден счёт, указанный для перемещения транзакций')
				simultaneousUpdateMainSpaceDataAction(store)
				return
			}
			processStandardError(error as StandardError)
		})
})