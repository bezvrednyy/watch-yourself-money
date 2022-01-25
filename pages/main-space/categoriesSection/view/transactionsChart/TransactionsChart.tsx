import {formatMoney} from '../../../../../common/utils/productUtils'
import styles from './TransactionsChart.module.css'
import {ChartProps, Doughnut} from 'react-chartjs-2'
import {
	ArcElement,
	Chart as ChartJS,
	Tooltip,
	TooltipItem,
} from 'chart.js'
import {useEffect, useMemo, useRef} from 'react'
import {useAtom} from '@reatom/react'
import {getColorById} from '../../../../../common/colors/theme'
import {useAloneAction} from '../../../../../commonClient/declareAloneAction'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../commonClient/environment/userSettingsAtom'
import {selectedPeriodAtom} from '../../../model/selectedPeriodAtom'
import {updateChartDataAction} from './model/externalActions'
import {transactionChartAtoms} from './model/transactionChartAtoms'

ChartJS.register(ArcElement, Tooltip)

export function TransactionsChart() {
	const ref = useRef()
	const [selectedPeriod] = useAtom(selectedPeriodAtom)
	const [categoriesExpensesData] = useAtom(transactionChartAtoms.categoriesExpensesAtom)
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)
	const handleUpdateExpenses = useAloneAction(updateChartDataAction)
	const chartProps = useChartProps()

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
				{...chartProps}
			/>
		</>
	)
}

function useChartProps(): Omit<ChartProps<'doughnut', number[], unknown>, 'type'> {
	const [categoriesExpensesData] = useAtom(transactionChartAtoms.categoriesExpensesAtom)
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)
	const expensesData = categoriesExpensesData.mainCategoriesExpenses
	const totalAmount = categoriesExpensesData.totalAmount

	return useMemo(() => {
		const labels: Array<string> = []
		const data = expensesData.length
			? expensesData.map(x => {
				labels.push(`${x.name}`)
				return x.money
			})
			: [1]
		const backgroundColors = expensesData.length
			? expensesData.map(x => getColorById(x.colorId))
			: getColorById('gray#300')
		const borderColors = expensesData.length
			? expensesData.map(x => getColorById(x.colorId, 1))
			: getColorById('gray#300')

		function getTooltipTitle(tooltipItems: Array<TooltipItem<'doughnut'>>): string {
			let total = 0
			tooltipItems.map(x => (total += x.parsed))
			//Погрешность ±1%
			const percent = Math.round(total / totalAmount * 100)

			return `Total: ${total} ${currencySymbol}\n`
				+ `Percent: ${percent}%`
		}

		return {
			redraw: !expensesData.length, //Чтобы при удалении последней транзакции происходила перерисовка
			data: {
				labels,
				datasets: [{
					data,
					backgroundColor: backgroundColors,
					spacing: 5,
					borderColor: borderColors,
					borderWidth: 2,
					borderRadius: 12,
					borderAlign: 'center',
				}],
			},
			options: {
				cutout: '60%',
				responsive: true,
				plugins: {
					tooltip: {
						enabled: !!expensesData.length,
						callbacks: {
							title: getTooltipTitle,
							label: tooltipItem => tooltipItem.label,
						},
					},
				},
			},
		}
	}, [totalAmount, currencySymbol, expensesData])
}