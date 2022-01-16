import {createAtom} from '@reatom/core'
import {createEnumAtom, createPrimitiveAtom} from '@reatom/core/primitives'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {verify} from '../../../../../../common/utils/verify'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {generateUuid} from '../../../../../../common/utils/generateRandom'
import {userSettingsAtom} from '../../../../../../commonClient/environment/userSettingsAtom'
import {bankAccountsAtom} from '../../../../model/bankAccountsAtom'
import {categoriesAtom, updateCategoriesAction} from '../../../../model/categoriesAtom'
import {toast} from 'react-hot-toast'
import {transactionsAtom, updateTransactionsAction} from '../../../../model/transactionsAtom'

const statusesAtom = createEnumAtom(['normal', 'saving'])
const selectedCategoryIdAtom = createPrimitiveAtom<string>('')
const sumAtom = createPrimitiveAtom<number>(0)
const selectedBankAccountId = createPrimitiveAtom<string>('')
const transactionCommentAtom = createPrimitiveAtom<string>('')
const transactionDateAtom = createPrimitiveAtom<Date>(new Date())
const selectedSubcategoryIdAtom = createAtom(
	{
		set: (v: string|null) => v,
		selectedCategoryIdAtom,
	},
	(track, state: string|null = null) => {
		track.onAction('set', v => (state = v))
		track.onChange('selectedCategoryIdAtom', () => (state = null))
		return state
	},
)

export const showPanelAtom = createAtom(
	{
		selectedCategoryIdAtom,
		sumAtom,
		selectedSubcategoryIdAtom,
		selectedBankAccountId,
		transactionCommentAtom,
		transactionDateAtom,
		statusesAtom,
		categoriesAtom,
		bankAccountsAtom,
		transactionsAtom,
		show: (transactionId?: string) => transactionId,
		close: () => {},
	},
	({ onAction, schedule, get }, state = false) => {
		onAction('show', transactionId => {
			const categories = get('categoriesAtom')
			const bankAccounts = get('bankAccountsAtom')
			const transactions = get('transactionsAtom')
			const initCategoryId = verify(categories.mainCategories[0], 'Error: there must be at least one category').id
			const initBankAccountId = verify(bankAccounts[0], 'Error: there must be at least one bank account').id
			state = true

			schedule(dispatch => {
				if (transactionId) {
					const transaction = verify(transactions.find(x => x.id === transactionId))
					dispatch(selectedCategoryIdAtom.set(transaction.categoryId))
					dispatch(selectedBankAccountId.set(transaction.bankAccountId))
					dispatch(sumAtom.set(transaction.money))
					dispatch(transactionCommentAtom.set(transaction.comment || ''))
					dispatch(transactionDateAtom.set(new Date(transaction.timestamp)))
				}
				else {
					dispatch(selectedCategoryIdAtom.set(initCategoryId))
					dispatch(selectedBankAccountId.set(initBankAccountId))
					dispatch(sumAtom.set(0))
					dispatch(transactionCommentAtom.set(''))
					dispatch(transactionDateAtom.set(new Date()))
				}
				dispatch(statusesAtom.setNormal())
			})
		})

		onAction('close', () => (state = false))

		return state
	},
)

type AddTransactionParams = {
	onClose: () => void,
}

export const addTransaction = declareAloneAction<AddTransactionParams>(async (store, {onClose}) => {
	const either = await getClientApi().transactions.createTransaction({
		id: generateUuid(),
		date: store.getState(transactionDateAtom),
		categoryId: store.getState(selectedSubcategoryIdAtom) || store.getState(selectedCategoryIdAtom),
		currencyId: store.getState(userSettingsAtom).currencyId,
		comment: store.getState(transactionCommentAtom),
		bankAccountId: store.getState(selectedBankAccountId),
		money: store.getState(sumAtom),
	})

	return either
		.mapRight(() => {
			store.dispatch(statusesAtom.setNormal())
			onClose()
			updateTransactionsAction(store)
		})
		.mapLeft(error => {
			if (error.type === 'CATEGORY_NOT_FOUND') {
				toast.error('Категория уже не существует.')
				updateCategoriesAction(store)
			}
			else {
				processStandardError(error)
			}
			store.dispatch(statusesAtom.setNormal())
			onClose()
		})
})

export const editTransactionPanelAtoms = {
	selectedCategoryIdAtom,
	sumAtom,
	selectedSubcategoryIdAtom,
	selectedBankAccountId,
	transactionCommentAtom,
	transactionDateAtom,
	statusesAtom,
	showPanelAtom,
}