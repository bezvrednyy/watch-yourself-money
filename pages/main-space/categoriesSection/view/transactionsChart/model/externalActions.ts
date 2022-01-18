import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../../../../../../commonClient/declareAloneAction'
import {SelectedPeriod} from '../../../../model/selectedPeriodAtom'
import {transactionChartAtoms} from './transactionChartAtoms'

type UpdateDataPayload = {
	selectedPeriod: SelectedPeriod,
}

const updateData = declareAloneAction(async (store, {
	selectedPeriod,
}: UpdateDataPayload) => {
	//TODO:chart Реализовать отправку периода и обновление всех данных
	const either = await getClientApi().chart.getExpensesData()
	either
		.mapRight(data => {
			store.dispatch(transactionChartAtoms.categoriesExpensesAtom.set(data))
		})
		.mapLeft(processStandardError)
})

export const transactionChartExternalActions = {
	updateData,
}