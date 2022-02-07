import {toast} from 'react-hot-toast'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {
	CreateTransactionRequestData,
} from '../../../../../../backFrontJoint/common/contracts/transactions/createTransactionContract'
import {declareAloneAction} from '../../../../../common/declareAloneAction'
import {userSettingsAtom} from '../../../../../common/environment/userSettingsAtom'
import {updateMainSpaceDataAction} from '../../../../model/updateMainSpaceDataAction'
import {transactionPanelAtoms} from './transactionPanelAtoms'

const saveData = declareAloneAction(async store => {
	const {transactionDateAtom, selectedSubcategoryIdAtom, selectedCategoryIdAtom, transactionIdAtom,
		transactionCommentAtom, selectedBankAccountId, sumAtom, statusesAtom, panelTypeAtom, showPanelAtom,
	} = transactionPanelAtoms

	const money = store.getState(sumAtom)
	if (money <= 0) {
		return
	}

	const data: CreateTransactionRequestData = {
		id: store.getState(transactionIdAtom),
		date: store.getState(transactionDateAtom),
		categoryId: store.getState(selectedSubcategoryIdAtom) || store.getState(selectedCategoryIdAtom),
		currencyId: store.getState(userSettingsAtom).currencyId,
		comment: store.getState(transactionCommentAtom),
		bankAccountId: store.getState(selectedBankAccountId),
		money,
	}

	store.dispatch(statusesAtom.setSaving())
	const either = store.getState(panelTypeAtom) === 'create'
		? await getClientApi().transactions.createTransaction(data)
		: await getClientApi().transactions.editTransaction(data)

	return either
		.mapRight(() => {
			store.dispatch(statusesAtom.setNormal())
			store.dispatch(showPanelAtom.close())
			updateMainSpaceDataAction(store)
		})
		.mapLeft(error => {
			if (error.type === 'CATEGORY_NOT_FOUND') {
				toast.error('Категория не найдена.')
				updateMainSpaceDataAction(store)
			}
			else if (error.type === 'TRANSACTION_NOT_FOUND') {
				toast.error('Транзакция не найдена.')
				updateMainSpaceDataAction(store)
			}
			else {
				processStandardError(error)
			}
			store.dispatch(statusesAtom.setNormal())
			store.dispatch(showPanelAtom.close())
		})
})

const removeTransaction = declareAloneAction(async store => {
	const {transactionIdAtom, statusesAtom, showPanelAtom} = transactionPanelAtoms
	store.dispatch(statusesAtom.setRemoving())
	const either = await getClientApi().transactions.removeTransaction({
		transactionId: store.getState(transactionIdAtom),
	})

	return either
		.mapRight(() => {
			store.dispatch(statusesAtom.setNormal())
			store.dispatch(showPanelAtom.close())
			updateMainSpaceDataAction(store)
		})
		.mapLeft(error => {
			if (error.type === 'TRANSACTION_NOT_FOUND') {
				toast.error('Транзакция не найдена.')
				updateMainSpaceDataAction(store)
			}
			else {
				processStandardError(error)
			}
			store.dispatch(statusesAtom.setNormal())
		})
})

export const transactionPanelExternalActions = {
	saveData,
	removeTransaction,
}