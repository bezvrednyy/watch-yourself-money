import {Doughnut} from 'react-chartjs-2'
import {
	ArcElement,
	Chart as ChartJS,
	Tooltip,
} from 'chart.js'
import {useEffect, useRef} from 'react'
import {useAtom} from '@reatom/react'
import {getColorById} from '../../../../../common/colors/theme'
import {useAloneAction} from '../../../../../commonClient/declareAloneAction'
import {categoriesAtom} from '../../../model/categoriesAtom'
import {selectedPeriodAtom} from '../../../model/selectedPeriodAtom'
import {transactionChartExternalActions} from './model/externalActions'
import {transactionChartAtoms} from './model/transactionChartAtoms'

ChartJS.register(ArcElement, Tooltip)

export function TransactionsChart() {
	const ref = useRef()
	const [selectedPeriod] = useAtom(selectedPeriodAtom)
	const [categories] = useAtom(categoriesAtom)
	const [categoriesExpensesData] = useAtom(transactionChartAtoms.categoriesExpensesAtom)
	const labels: Array<string> = []
	const data = categoriesExpensesData.mainCategoriesExpenses.map(x => {
		labels.push(`${x.name}`)
		return x.money
	})

	const handleUpdateExpenses = useAloneAction(transactionChartExternalActions.updateData)

	useEffect(() => {
		//TODO:chart обновлять после изменения транзакций.
		//Заиспользовал useEffect, вместо track.onChange чтобы иметь возможность задействовать aloneActions
		handleUpdateExpenses({
			selectedPeriod,
		})
	}, [handleUpdateExpenses, selectedPeriod])

	return (
		<Doughnut
			ref={ref}
			data={{
				labels,
				datasets: [{
					data,
					backgroundColor: categories.mainCategories.map(x => getColorById(x.colorId)),
					spacing: 5,
					borderColor: categories.mainCategories.map(x => getColorById(x.colorId, 1)),
					borderWidth: 2,
					borderRadius: 12,
					borderAlign: 'center',
				}],
			}}
			options={{
				responsive: true,
			}}
			redraw={false}
		/>
	)
}