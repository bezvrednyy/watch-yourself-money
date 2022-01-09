import {PlusIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {getMilliseconds} from 'date-fns'
import {useEffect, useState} from 'react'
import {joinClassNames} from '../../../common/joinClassNames'
import {verify} from '../../../common/verify'
import {Button} from '../../../components/button/Button'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
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
	const [open, setOpen] = useState(false)
	const transactionsByDays: Array<DayTransitionsData> = []

	useInitAtoms()
	return (
		<div className='flex flex-col w-4/12 bg-white py-5'>
			{transactionsByDays.map(x => <DayTransactionsHistorySection
				key={getMilliseconds(x.dayDate)}
				dayDate={x.dayDate}
				transitions={x.transitions}
			/>)}
			<div className='mt-auto px-5 pb-5'>
				{open && <AddTransactionPanel />}
				<ButtonsSection open={open} setOpen={setOpen} />
			</div>
		</div>)
}

function useInitAtoms() {
	const [categories] = useAtom(categoriesAtom)
	const [bankAccounts] = useAtom(bankAccountsAtom)
	const initCategoryId = verify(categories.mainCategories[0], 'Error: there must be at least one category').id
	const initBankAccountId = verify(bankAccounts[0], 'Error: there must be at least one bank account').id

	const handleSetSelectCategoryId = useAction(addTransactionSectionAtoms.selectedCategoryIdAtom.set)
	const handleSetSelectedBankAccountId = useAction(addTransactionSectionAtoms.selectedBankAccountId.set)

	useEffect(() => {
		handleSetSelectCategoryId(initCategoryId)
		handleSetSelectedBankAccountId(initBankAccountId)
	}, [
		handleSetSelectCategoryId,
		handleSetSelectedBankAccountId,
		initBankAccountId,
		initCategoryId,
	])
}

type ButtonsSectionProps = {
	open: boolean,
	setOpen: (v: boolean) => void,
}

function ButtonsSection({
	open,
	setOpen,
}: ButtonsSectionProps) {
	if (open) {
		return (
			<div className='flex space-x-3 mt-3'>
				<Button
					style='blue-default'
					onClick={() => {
						//TODO:Сохранение данных
						setOpen(false)
					}}
					structure='text'
					text='Save'
				/>
				<Button
					style='secondary'
					onClick={() => setOpen(false)}
					structure='text'
					text='Cancel'
				/>
			</div>
		)
	}

	return (
		<div
			key='open'
			className={joinClassNames(
				'flex justify-between w-full px-4 py-2.5 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg',
				'hover:bg-purple-200 cursor-pointer',
			)}
			onClick={() => setOpen(true)}
		>
			<span>Add new transaction</span>
			<PlusIcon className='w-5 h-5 text-purple-500' />
		</div>
	)
}

export {
	HistorySection,
}