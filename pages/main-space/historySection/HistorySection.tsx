import {PlusIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {startOfDay} from 'date-fns'
import {useEffect, useMemo, useState} from 'react'
import {mapToArray} from '../../../common/array'
import {defaultCompare} from '../../../common/compare'
import {useAsyncAction} from '../../../common/declareAsyncAction'
import {joinStrings} from '../../../common/string'
import {verify} from '../../../common/verify'
import {Button} from '../../../uikit/button/Button'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {categoriesAtom} from '../model/categoriesAtom'
import {transactionsAtom} from '../model/transactionsAtom'
import {AddTransactionPanel} from './content/addTransactionSection/AddTransactionPanel'
import {
	addTransaction,
	addTransactionSectionAtoms,
} from './content/addTransactionSection/model/addTransactionSectionAtoms'
import {ViewTransactionInfo} from './content/TransactionHistorySectionItem'
import {DayTransactionsHistorySection} from './content/DayTransactionsHistorySection'

function HistorySection() {
	useInitAtoms()
	const [transactions] = useAtom(transactionsAtom)
	const [bankAccounts] = useAtom(bankAccountsAtom)
	const [open, setOpen] = useState(false)

	const transactionsByDays = useMemo(() => {
		const result: Map<number, Array<ViewTransactionInfo>> = new Map()
		transactions.forEach(x => {
			const timestamp = startOfDay(x.timestamp).getTime()
			const bankAccount = verify(bankAccounts.find(account => account.id === x.bankAccountId))
			const newItem: ViewTransactionInfo = {
				id: x.id,
				categoryId: x.categoryId,
				bankCardName: bankAccount.name,
				money: x.money,
				comment: x.comment,
			}

			const items = result.get(timestamp)
			if (items) {
				items.push(newItem)
				return
			}
			result.set(timestamp, [newItem])
		})
		return mapToArray(result)
			.sort((x, y) => defaultCompare(
				x.key,
				y.key,
			))
	}, [bankAccounts, transactions])

	return (
		<div className='flex flex-col w-4/12 bg-white py-5'>
			{transactionsByDays.map(x => <DayTransactionsHistorySection
				key={x.key}
				timestamp={x.key}
				transitions={x.value}
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
	const handleAddTransaction = useAsyncAction(addTransaction)

	if (open) {
		return (
			<div className='flex space-x-3 mt-3'>
				<Button
					style='blue-default'
					onClick={() => handleAddTransaction({
						onClose: () => setOpen(false),
					})}
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
			className={joinStrings(
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