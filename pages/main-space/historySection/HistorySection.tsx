import {PlusIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {startOfDay} from 'date-fns'
import {useMemo} from 'react'
import {mapToArray} from '../../../common/utils/array'
import {defaultCompare} from '../../../common/utils/compare'
import {useAloneAction} from '../../../commonClient/declareAloneAction'
import {joinStrings} from '../../../common/utils/string'
import {verify} from '../../../common/utils/verify'
import {Button} from '../../../commonClient/uikit/button/Button'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {transactionsAtom} from '../model/transactionsAtom'
import {TransactionPanel} from './content/transactionPanel/TransactionPanel'
import {transactionPanelAtoms} from './content/transactionPanel/model/transactionPanelAtoms'
import {transactionPanelExternalActions} from './content/transactionPanel/model/externalActions'
import {ViewTransactionInfo} from './content/TransactionHistorySectionItem'
import {DayTransactionsHistorySection} from './content/DayTransactionsHistorySection'

function HistorySection() {
	const [transactions] = useAtom(transactionsAtom)
	const [bankAccounts] = useAtom(bankAccountsAtom)
	const [showPanel] = useAtom(transactionPanelAtoms.showPanelAtom)

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
		<div className='flex flex-col w-4/12 bg-white'>
			<div className='flex-grow overflow-auto scrollbar py-5 shadow-[inset_0_-6px_9px_-9px_rgba(0,0,0,0.3)]'>
				{transactionsByDays.map(x => <DayTransactionsHistorySection
					key={x.key}
					timestamp={x.key}
					transitions={x.value}
				/>)}
			</div>
			<div className='px-5 pt-5 pb-5'>
				{showPanel && <TransactionPanel />}
				<ButtonsSection />
			</div>
		</div>)
}

function ButtonsSection() {
	const [showPanel] = useAtom(transactionPanelAtoms.showPanelAtom)
	const [panelType] = useAtom(transactionPanelAtoms.panelTypeAtom)
	const handleShowPanel = useAction(transactionPanelAtoms.showPanelAtom.show)
	const handleClosePanel = useAction(transactionPanelAtoms.showPanelAtom.close)
	const handleSaveData = useAloneAction(transactionPanelExternalActions.saveData)
	const handleRemoveTransaction = useAloneAction(transactionPanelExternalActions.removeTransaction)

	if (showPanel) {
		return (
			<div className='flex space-x-3 mt-3'>
				<Button
					style='blue-default'
					onClick={() => handleSaveData()}
					structure='text'
					text='Save'
				/>
				{panelType === 'edit' && <Button
					style='destructure'
					onClick={() => handleRemoveTransaction()}
					structure='text'
					text='Remove'
				/>}
				<Button
					style='secondary'
					onClick={handleClosePanel}
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
			onClick={() => handleShowPanel({ type: 'create' })}
		>
			<span>Add new transaction</span>
			<PlusIcon className='w-5 h-5 text-purple-500' />
		</div>
	)
}

export {
	HistorySection,
}