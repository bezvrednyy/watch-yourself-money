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
	return (
		<div>
			<p className=''>
				{format(dayDate, 'yyyy-MM-dd')}
			</p>
			<div className='flex flex-col p-5 space-y-2'>
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