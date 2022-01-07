import {getMilliseconds} from 'date-fns'
import {ViewTransactionInfo} from './content/TransactionHistorySectionItem'
import {DayTransactionsHistorySection} from './content/DayTransactionsHistorySection'

type DayTransitionsData = {
	dayDate: Date,
	transitions: Array<ViewTransactionInfo>,
}

function HistorySection() {
	const transactionsByDays: Array<DayTransitionsData> = [{
		dayDate: new Date(),
		transitions: [{
			id: 'id-1',
			categoryId: 1,
			bankCardName: 'Сбербанк',
			moneyInfo: {
				value: 1200,
				type: 'expense',
			},
			comment: '#Аня',
		}, {
			id: 'id-2',
			categoryId: 2,
			bankCardName: 'Сбербанк',
			moneyInfo: {
				value: 700,
				type: 'income',
			},
		}],
	}]
	return (
		<div className='w-4/12 bg-white'>
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