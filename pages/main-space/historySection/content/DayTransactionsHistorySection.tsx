import {useAction} from '@reatom/react'
import {format, getYear} from 'date-fns'
import {transactionPanelAtoms} from './transactionPanel/model/transactionPanelAtoms'
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
	const handleShowTransactionPanel = useAction(transactionPanelAtoms.showPanelAtom.show)
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
					onClick={() => handleShowTransactionPanel({
						type: 'edit',
						transactionId: x.id,
					})}
				/>)}
			</div>
		</div>
	)
}

export {
	DayTransactionsHistorySection,
}