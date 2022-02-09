import {mergeInOne} from '@sweet-monads/either'
import {getClientApi} from '../../../backFrontJoint/clientApi/clientApi'
import {devideArray} from '../../../common/utils/array'
import {declareAloneAction} from '../../common/declareAloneAction'
import {updateChartDataAction} from '../categoriesSection/view/transactionsChart/model/externalActions'
import {transactionChartAtoms} from '../categoriesSection/view/transactionsChart/model/transactionChartAtoms'
import {bankAccountsAtom, updateBankAccountsAction} from './bankAccountsAtom'
import {MainCategoryData, SubCategoryData, categoriesAtom, updateCategoriesAction} from './categoriesAtom'
import {selectedPeriodAtom} from './selectedPeriodAtom'
import {transactionsAtom, updateTransactionsAction} from './transactionsAtom'

type MainSpaceDataType = 'categories'|'transactions'|'chart'|'bankAccounts'
type UpdateMainSpaceDataPayload = Array<MainSpaceDataType>

export const asyncUpdateMainSpaceDataAction = declareAloneAction<UpdateMainSpaceDataPayload|void>(async (
	store,
	types,
) => {
	const typesSet: Set<MainSpaceDataType> = new Set(types || ['categories', 'transactions', 'chart', 'bankAccounts'])
	await Promise.all([
		typesSet.has('categories') && updateCategoriesAction(store),
		typesSet.has('transactions') && updateTransactionsAction(store),
		typesSet.has('chart') && updateChartDataAction(store),
		typesSet.has('bankAccounts') && updateBankAccountsAction(store),
	])
})

//Одновременное обновление гарантирует консистентность данных на фронте. Проблемный кейс: пользователь в другой вкладке удалил категорию,
// а на первой вклдаке есть транзакция с этой категорией. Если на первой вкладке произойдёт обновление категорий на долю секунды раньше, то выпадет ошибка, т. к.
// секция транзакций не сможет найти нужную категорию.
export const simultaneousUpdateMainSpaceDataAction = declareAloneAction<UpdateMainSpaceDataPayload|void>(async store => {
	const selectedPeriod = store.getState(selectedPeriodAtom)

	const eithers = await Promise.all([
		getClientApi().categories.getCategories(),
		getClientApi().transactions.getTransactions(selectedPeriod),
		getClientApi().chart.getExpensesData(selectedPeriod),
		getClientApi().bankAccounts.getBankAccounts(),
	])

	mergeInOne(eithers)
		.mapRight(([
			categories,
			transactions,
			categoriesExpenses,
			bankAccounts,
		]) => {
			store.dispatch(transactionsAtom.set(transactions))

			const [mainCategories, subCategories] = devideArray(categories, x => x.parentCategoryId === undefined)
			store.dispatch(categoriesAtom.set({
				mainCategories: mainCategories as Array<MainCategoryData>,
				subCategories: subCategories as Array<SubCategoryData>,
			}))
			store.dispatch(bankAccountsAtom.set(bankAccounts))
			store.dispatch(transactionChartAtoms.categoriesExpensesAtom.set(categoriesExpenses))
		})
})