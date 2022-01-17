import {Doughnut} from 'react-chartjs-2'
import {
	ArcElement,
	Chart as ChartJS,
	Tooltip,
} from 'chart.js'
import {useRef} from 'react'
import {useAtom} from '@reatom/react'
import {getColorById} from '../../../../common/colors/theme'
import {generateRandomInt} from '../../../../common/utils/generateRandom'
import {categoriesAtom} from '../../model/categoriesAtom'

ChartJS.register(ArcElement, Tooltip)

export function TransactionsChart() {
	const ref = useRef()
	const [categories] = useAtom(categoriesAtom)
	const labels = categories.mainCategories.map(x => x.title)
	//TODO: переделать на запросы, пусть считает БД.
	const data = categories.mainCategories.map(() => generateRandomInt())

	return (
		<Doughnut
			ref={ref}
			data={{
				labels,
				datasets: [{
					data: [50, 50],
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