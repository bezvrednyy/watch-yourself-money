import {formatMoney} from '../../../../../common/utils/productUtils'
import styles from './TransactionsChart.module.css'
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
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../commonClient/environment/userSettingsAtom'
import {categoriesAtom} from '../../../model/categoriesAtom'
import {selectedPeriodAtom} from '../../../model/selectedPeriodAtom'
import {updateChartDataAction} from './model/externalActions'
import {transactionChartAtoms} from './model/transactionChartAtoms'

ChartJS.register(ArcElement, Tooltip)

export function TransactionsChart() {
	const ref = useRef()
	const [selectedPeriod] = useAtom(selectedPeriodAtom)
	const [categories] = useAtom(categoriesAtom)
	const [categoriesExpensesData] = useAtom(transactionChartAtoms.categoriesExpensesAtom)
	const labels: Array<string> = []
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)
	const data = categoriesExpensesData.mainCategoriesExpenses.map(x => {
		labels.push(`${x.name}`)
		return x.money
	})

	const handleUpdateExpenses = useAloneAction(updateChartDataAction)

	useEffect(() => {
		//Заиспользовал useEffect, вместо track.onChange чтобы иметь возможность задействовать aloneActions
		handleUpdateExpenses({
			selectedPeriod,
		})
	}, [handleUpdateExpenses, selectedPeriod])

	return (
		<>
			<div className={styles.total}>
				{formatMoney(categoriesExpensesData.totalAmount) + ' ' + currencySymbol}
			</div>
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
					cutout: '60%',
					responsive: true,
					plugins: { tooltip: { callbacks: {
						title: tooltipItems => {
							let total = 0
							tooltipItems.map(x => (total += x.parsed))
							//Погрешность ±1%
							const percent = Math.round(total / categoriesExpensesData.totalAmount * 100)

							return `Total: ${total} ${currencySymbol}\n`
								+ `Percent: ${percent}%`
						},
						label: tooltipItem => tooltipItem.label,
					}}},
				}}
				redraw={false}
			/>
		</>
	)
}