import {format} from 'date-fns'
import {
	TransactionHistorySectionItem,
	ViewTransactionInfo,
} from './TransactionHistorySectionItem'

type DayTransitionsHistorySectionProps = {
	dayDate: Date,
	transitions: Array<ViewTransactionInfo>,
}

function DayTransactionsHistorySection({
	dayDate,
	transitions,
}: DayTransitionsHistorySectionProps) {
	const onClick = (id: string) => console.log(`Click on transition ${id}`) //TODO Reatom
	const currentDate = new Date()
	const formatType = currentDate.getFullYear() === dayDate.getFullYear()
		? 'd MMMM'
		: 'd MMMM yyyy'

	return (
		<div className='px-10 py-5'>
			<h2 className='mb-5 px-4 font-medium'>
				{format(dayDate, formatType)}
			</h2>
			<div className='flex flex-col'>
				{transitions.map(x => <TransactionHistorySectionItem
					key={x.id}
					{...x}
					onClick={onClick}
				/>)}
			</div>
		</div>
	)
}

export {
	DayTransactionsHistorySection,
}