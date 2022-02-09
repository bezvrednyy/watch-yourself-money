import {createAtom} from '@reatom/core'
import {createEnumAtom, createPrimitiveAtom} from '@reatom/core/primitives'
import {generateUuid} from '../../../../../../common/utils/generateRandom'
import {verify} from '../../../../../../common/utils/verify'
import {bankAccountsAtom} from '../../../../model/bankAccountsAtom'
import {categoriesAtom} from '../../../../model/categoriesAtom'
import {transactionsAtom} from '../../../../model/transactionsAtom'

const INIT_CATEGORY_ID = ''

const transactionIdAtom = createPrimitiveAtom<string>('')
const statusesAtom = createEnumAtom(['normal', 'saving', 'removing'])
const selectedCategoryIdAtom = createPrimitiveAtom<string>(INIT_CATEGORY_ID)
const sumAtom = createPrimitiveAtom<number>(0)
const selectedBankAccountId = createPrimitiveAtom<string>('')
const transactionCommentAtom = createPrimitiveAtom<string>('')
const transactionDateAtom = createPrimitiveAtom<Date>(new Date())
const selectedSubcategoryIdAtom = createPrimitiveAtom<string|null>(null)
const panelTypeAtom = createEnumAtom(['create', 'edit'])
const transactionTypeAtom = createEnumAtom(['expenses', 'incomes'])

type ShowPanelArgs = {
	type: 'create'
} | {
	type: 'edit'
	transactionId: string
}

const showPanelAtom = createAtom(
	{
		categoriesAtom,
		bankAccountsAtom,
		transactionsAtom,
		show: (data: ShowPanelArgs) => data,
		close: () => {},
	},
	({ onAction, schedule, get }, state = false) => {
		onAction('show', data => {
			const {mainCategories, subCategories} = get('categoriesAtom')
			const bankAccounts = get('bankAccountsAtom')
			const transactions = get('transactionsAtom')
			const initCategoryId = verify(mainCategories[0], 'Error: there must be at least one category').id
			const initBankAccountId = verify(bankAccounts[0], 'Error: there must be at least one bank account').id
			state = true

			schedule(dispatch => {
				if (data.type === 'edit') {
					const transaction = verify(transactions.find(x => x.id === data.transactionId))
					const category = verify(mainCategories.find(x => x.id === transaction.categoryId) || subCategories.find(x => x.id === transaction.categoryId))
					if (category.parentCategoryId) {
						dispatch(selectedSubcategoryIdAtom.set(category.id))
						dispatch(selectedCategoryIdAtom.set(category.parentCategoryId))
					}
					else {
						dispatch(selectedSubcategoryIdAtom.set(null))
						dispatch(selectedCategoryIdAtom.set(category.id))
					}
					dispatch(transactionIdAtom.set(transaction.id))
					dispatch(selectedBankAccountId.set(transaction.bankAccountId))
					dispatch(sumAtom.set(transaction.money))
					dispatch(panelTypeAtom.setEdit())
					dispatch(transactionCommentAtom.set(transaction.comment || ''))
					dispatch(transactionDateAtom.set(new Date(transaction.timestamp)))
				}
				else {
					dispatch(transactionIdAtom.set(generateUuid()))
					dispatch(selectedCategoryIdAtom.set(initCategoryId))
					dispatch(selectedBankAccountId.set(initBankAccountId))
					dispatch(sumAtom.set(0))
					dispatch(transactionCommentAtom.set(''))
					dispatch(transactionDateAtom.set(new Date()))
					dispatch(selectedSubcategoryIdAtom.set(null))
					dispatch(panelTypeAtom.setCreate())
				}
				dispatch(statusesAtom.setNormal())
			})
		})

		onAction('close', () => (state = false))

		return state
	},
)

export const transactionPanelAtoms = {
	selectedCategoryIdAtom,
	sumAtom,
	selectedSubcategoryIdAtom,
	selectedBankAccountId,
	transactionCommentAtom,
	transactionDateAtom,
	statusesAtom,
	showPanelAtom,
	panelTypeAtom,
	transactionIdAtom,
	transactionTypeAtom,
}