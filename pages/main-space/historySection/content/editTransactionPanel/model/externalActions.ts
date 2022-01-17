import {toast} from 'react-hot-toast'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {userSettingsAtom} from '../../../../../../commonClient/environment/userSettingsAtom'
import {updateCategoriesAction} from '../../../../model/categoriesAtom'
import {updateTransactionsAction} from '../../../../model/transactionsAtom'
import {editTransactionPanelAtoms} from './editTransactionPanelAtoms'

type AddTransactionParams = {
	onClose: () => void,
}

const saveData = declareAloneAction<AddTransactionParams>(async (store, { onClose }) => {
	const {transactionDateAtom, selectedSubcategoryIdAtom, selectedCategoryIdAtom, transactionIdAtom,
		transactionCommentAtom, selectedBankAccountId, sumAtom, statusesAtom, panelTypeAtom,
	} = editTransactionPanelAtoms

	const data = {
		id: store.getState(transactionIdAtom),
		date: store.getState(transactionDateAtom),
		categoryId: store.getState(selectedSubcategoryIdAtom) || store.getState(selectedCategoryIdAtom),
		currencyId: store.getState(userSettingsAtom).currencyId,
		comment: store.getState(transactionCommentAtom),
		bankAccountId: store.getState(selectedBankAccountId),
		money: store.getState(sumAtom),
	}

	const either = store.getState(panelTypeAtom) === 'create'
		? await getClientApi().transactions.createTransaction(data)
		: await getClientApi().transactions.editTransaction(data)

	return either
		.mapRight(() => {
			store.dispatch(statusesAtom.setNormal())
			onClose()
			updateTransactionsAction(store)
		})
		.mapLeft(error => {
			if (error.type === 'CATEGORY_NOT_FOUND') {
				toast.error('Категория не найдена.')
				updateCategoriesAction(store)
			}
			else if (error.type === 'TRANSACTION_NOT_FOUND') {
				toast.error('Транзакция не найдена.')
				updateCategoriesAction(store) //обновляем категории вместе с транзакциями
			}
			else {
				processStandardError(error)
			}
			store.dispatch(statusesAtom.setNormal())
			onClose()
		})
})

export const transactionPanelExternalActions = {
	saveData,
}