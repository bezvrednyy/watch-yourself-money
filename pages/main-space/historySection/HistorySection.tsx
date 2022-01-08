import {MinusIcon, PlusIcon} from '@heroicons/react/solid'
import {getMilliseconds} from 'date-fns'
import {joinClassNames} from '../../../common/joinClassNames'
import DisclosureDefault from '../../../components/DisclosureDefault'
import {ViewTransactionInfo} from './content/TransactionHistorySectionItem'
import {DayTransactionsHistorySection} from './content/DayTransactionsHistorySection'

type DayTransitionsData = {
	dayDate: Date,
	transitions: Array<ViewTransactionInfo>,
}

function HistorySection() {
	const transactionsByDays: Array<DayTransitionsData> = []
	const iconClass = 'w-5 h-5 text-purple-500'
	return (
		<div className='w-4/12 bg-white py-5'>
			{transactionsByDays.map(x => <DayTransactionsHistorySection
				key={getMilliseconds(x.dayDate)}
				dayDate={x.dayDate}
				transitions={x.transitions}
			/>)}
			<DisclosureDefault
				createButton={open => <div className={joinClassNames(
					'flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg',
					'hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}>
					<span>Add new transaction</span>
					{open ? <MinusIcon className={iconClass} /> : <PlusIcon className={iconClass} />}
				</div>}
				createPanel={() => <div>Hello</div>}
			/>
		</div>)
}

export {
	HistorySection,
}