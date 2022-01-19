import {declareAloneAction} from '../../../commonClient/declareAloneAction'
import {updateChartDataAction} from '../categoriesSection/view/transactionsChart/model/externalActions'
import {updateCategoriesAction} from './categoriesAtom'
import {selectedPeriodAtom} from './selectedPeriodAtom'
import {updateTransactionsAction} from './transactionsAtom'

type MainSpaceDataType = 'categories'|'transactions'|'chart'|'cards'
type UpdateMainSpaceDataPayload = Array<MainSpaceDataType>

export const updateMainSpaceDataAction = declareAloneAction<UpdateMainSpaceDataPayload|void>(async (
	store,
	types,
) => {
	const typesSet = new Set(types || ['categories', 'transactions', 'chart', 'cards'])
	const selectedPeriod = store.getState(selectedPeriodAtom)
	await Promise.all([
		typesSet.has('categories') && updateCategoriesAction(store),
		typesSet.has('transactions') && updateTransactionsAction(store),
		typesSet.has('chart') && updateChartDataAction(store, { selectedPeriod }),
	])
})