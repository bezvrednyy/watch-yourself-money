import {createAtom} from '@reatom/core'
import {createEnumAtom, createPrimitiveAtom} from '@reatom/core/primitives'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAsyncAction} from '../../../../../../commonClient/declareAsyncAction'
import {generateUuid} from '../../../../../../common/utils/generateRandom'
import {userSettingsAtom} from '../../../../../../commonClient/environment/userSettingsAtom'

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

export const addTransaction = declareAsyncAction<AddTransactionParams>(async (store, {onClose}) => {
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
			//TODO:toast
			store.dispatch(statusesAtom.setNormal())
			onClose()
		})
		.mapLeft(error => {
			store.dispatch(statusesAtom.setNormal())
			onClose()
			processStandardError(error)
		})
})

export const addTransactionSectionAtoms = {
	selectedCategoryIdAtom,
	sumAtom,
	selectedSubcategoryIdAtom,
	selectedBankAccountId,
	transactionCommentAtom,
	transactionDateAtom,
	statusesAtom,
}