import {createAtom} from '@reatom/core'
import {createEnumAtom, createPrimitiveAtom} from '@reatom/core/primitives'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {generateUuid} from '../../../../../../common/utils/generateRandom'
import {userSettingsAtom} from '../../../../../../commonClient/environment/userSettingsAtom'
import {updateCategoriesAction} from '../../../../model/categoriesAtom'
import {toast} from 'react-hot-toast'
import {updateTransactionsAction} from '../../../../model/transactionsAtom'

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
}