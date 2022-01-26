import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {selectedPeriodAtom} from '../../../../model/selectedPeriodAtom'
import {transactionChartAtoms} from './transactionChartAtoms'

export const updateChartDataAction = declareAloneAction(async store => {
	const selectedPeriod = store.getState(selectedPeriodAtom)
	const either = await getClientApi().chart.getExpensesData(selectedPeriod)
	either
		.mapRight(data => {
			store.dispatch(transactionChartAtoms.categoriesExpensesAtom.set(data))
		})
		.mapLeft(processStandardError)
})