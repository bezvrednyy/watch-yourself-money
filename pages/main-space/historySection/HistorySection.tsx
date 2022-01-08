import {getMilliseconds} from 'date-fns'
import {ViewTransactionInfo} from './content/TransactionHistorySectionItem'
import {DayTransactionsHistorySection} from './content/DayTransactionsHistorySection'

type DayTransitionsData = {
	dayDate: Date,
	transitions: Array<ViewTransactionInfo>,
}

function HistorySection() {
	const transactionsByDays: Array<DayTransitionsData> = []
	return (
		<div className='w-4/12 bg-white py-5'>
			{transactionsByDays.map(x => <DayTransactionsHistorySection
				key={getMilliseconds(x.dayDate)}
				dayDate={x.dayDate}
				transitions={x.transitions}
			/>)}
		</div>)
}

export {
	HistorySection,
}