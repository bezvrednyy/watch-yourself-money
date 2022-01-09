import {MinusIcon, PlusIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {getMilliseconds} from 'date-fns'
import {useEffect} from 'react'
import {joinClassNames} from '../../../common/joinClassNames'
import {verify} from '../../../common/verify'
import DisclosureDefault from '../../../components/DisclosureDefault'
import {categoriesAtom} from '../model/categoriesAtom'
import {AddTransactionPanel} from './content/addTransactionSection/AddTransactionPanel'
import {addTransactionSectionAtoms} from './content/addTransactionSection/model/addTransactionSectionAtoms'
import {ViewTransactionInfo} from './content/TransactionHistorySectionItem'
import {DayTransactionsHistorySection} from './content/DayTransactionsHistorySection'

type DayTransitionsData = {
	dayDate: Date,
	transitions: Array<ViewTransactionInfo>,
}

function HistorySection() {
	const transactionsByDays: Array<DayTransitionsData> = []
	useInitAtoms()
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
					'flex justify-between w-full px-4 py-2 mt-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg',
					'hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75',
				)}>
					<span>Add new transaction</span>
					{open ? <MinusIcon className={iconClass} /> : <PlusIcon className={iconClass} />}
				</div>}
				createPanel={() => <AddTransactionPanel />}
			/>
		</div>)
}

function useInitAtoms() {
	const [categories] = useAtom(categoriesAtom)
	const initCategoryId = verify(categories.mainCategories[0], 'Error: there must be at least one category').id
	const handleSetSelectCategoryId = useAction(addTransactionSectionAtoms.selectedCategoryIdAtom.set)

	useEffect(() => {
		handleSetSelectCategoryId(initCategoryId)
	}, [handleSetSelectCategoryId, initCategoryId])
}

export {
	HistorySection,
}