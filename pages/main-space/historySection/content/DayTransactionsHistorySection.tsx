import {format, getYear} from 'date-fns'
import {
	TransactionHistorySectionItem,
	ViewTransactionInfo,
} from './TransactionHistorySectionItem'

type DayTransitionsHistorySectionProps = {
	timestamp: number,
	transitions: Array<ViewTransactionInfo>,
}

function DayTransactionsHistorySection({
	timestamp,
	transitions,
}: DayTransitionsHistorySectionProps) {
	const onClick = (id: string) => console.log(`Click on transition ${id}`) //TODO Reatom
	const currentDate = new Date()
	const formatType = getYear(currentDate) === getYear(timestamp)
		? 'd MMMM'
		: 'd MMMM yyyy'

	return (
		<div className='px-10 py-5'>
			<h2 className='mb-5 px-4 font-medium' suppressHydrationWarning>
				{format(timestamp, formatType)}
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