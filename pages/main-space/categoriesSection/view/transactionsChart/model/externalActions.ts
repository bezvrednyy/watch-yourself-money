import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {SelectedPeriod} from '../../../../model/selectedPeriodAtom'
import {transactionChartAtoms} from './transactionChartAtoms'

type UpdateDataPayload = {
	selectedPeriod: SelectedPeriod,
}

export const updateChartDataAction = declareAloneAction(async (store, {
	selectedPeriod,
}: UpdateDataPayload) => {
	//TODO:chart обновление всех данных: категорий, транзакций и т. п.
	const either = await getClientApi().chart.getExpensesData(selectedPeriod)
	either
		.mapRight(data => {
			store.dispatch(transactionChartAtoms.categoriesExpensesAtom.set(data))
		})
		.mapLeft(processStandardError)
})