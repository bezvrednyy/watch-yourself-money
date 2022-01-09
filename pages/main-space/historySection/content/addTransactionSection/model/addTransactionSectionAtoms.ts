import {createAtom} from '@reatom/core'
import {createPrimitiveAtom} from '@reatom/core/primitives'
import {declareAsyncAction} from '../../../../../../common/declareAsyncAction'
import {generateUuid} from '../../../../../../common/generateRandom'
import {getEnvType} from '../../../../../../environment/environment'
import {userSettingsAtom} from '../../../../../../environment/userSettingsAtom'
import {AddTransactionRequestData} from '../../../../../api/transactions/add_transaction'

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
	const data: AddTransactionRequestData = {
		id: generateUuid(),
		date: store.getState(transactionDateAtom),
		categoryId: store.getState(selectedSubcategoryIdAtom) || store.getState(selectedCategoryIdAtom),
		currencyId: store.getState(userSettingsAtom).currencyId,
		comment: store.getState(transactionCommentAtom),
		bankAccountId: store.getState(selectedBankAccountId),
		money: store.getState(sumAtom),
	}

	//TODO: Either вместо исключений
	const res = await fetch('/api/transactions/add_transaction', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			data,
		}),
	})

	if (getEnvType() !== 'production') {
		console.log(data)
		console.log(res)
	}

	if (res.ok) {
		//TODO: добавить тостер и обновление транзакций
		onClose()
	}
})

export const addTransactionSectionAtoms = {
	selectedCategoryIdAtom,
	sumAtom,
	selectedSubcategoryIdAtom,
	selectedBankAccountId,
	transactionCommentAtom,
	transactionDateAtom,
}