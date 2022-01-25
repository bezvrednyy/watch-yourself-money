import styles from './HistorySection.module.css'
import {PlusIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {startOfDay} from 'date-fns'
import {useMemo} from 'react'
import {mapToArray} from '../../../common/utils/array'
import {defaultCompare} from '../../../common/utils/compare'
import {Logger} from '../../../common/utils/Logger'
import {useAloneAction} from '../../../commonClient/declareAloneAction'
import {joinStrings} from '../../../common/utils/string'
import {Button} from '../../../commonClient/uikit/button/Button'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {transactionsAtom} from '../model/transactionsAtom'
import {TransactionPanel} from './content/transactionPanel/TransactionPanel'
import {transactionPanelAtoms} from './content/transactionPanel/model/transactionPanelAtoms'
import {transactionPanelExternalActions} from './content/transactionPanel/model/externalActions'
import {ViewTransactionInfo} from './content/TransactionHistorySectionItem'
import {DayTransactionsHistorySection} from './content/DayTransactionsHistorySection'
import {SwitchHorizontalIcon} from '@heroicons/react/outline'

function HistorySection() {
	const [transactions] = useAtom(transactionsAtom)
	const [bankAccounts] = useAtom(bankAccountsAtom)
	const [showPanel] = useAtom(transactionPanelAtoms.showPanelAtom)

	const transactionsByDays = useMemo(() => {
		const result: Map<number, Array<ViewTransactionInfo>> = new Map()
		transactions.forEach(x => {
			const timestamp = startOfDay(x.timestamp).getTime()
			const bankAccount = bankAccounts.find(account => account.id === x.bankAccountId)
			if (!bankAccount) {
				Logger.error('No consistent data: bank account not found!')
				//TODO:improvements Перенести бизнес логику в атомы и там обрабатывать ошибки.
			}

			const newItem: ViewTransactionInfo = {
				id: x.id,
				categoryId: x.categoryId,
				bankAccountName: bankAccount ? bankAccount.name : '',
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
	const content = transactionsByDays.length
		? <div className={joinStrings('flex-grow overflow-auto py-5', styles.section)}>
			{transactionsByDays.map(x => <DayTransactionsHistorySection
				key={x.key}
				timestamp={x.key}
				transitions={x.value}
			/>)}
		</div>
		: <EmptyContent />

	return (
		<div className='flex flex-col min-w-[400px] max-w-[460px] flex-grow bg-white'>
			{content}
			<div className={`px-5 pt-5 pb-5 ${styles['panel-section']}`}>
				{showPanel && <TransactionPanel />}
				<ButtonsSection />
			</div>
		</div>)
}

function EmptyContent() {
	return (
		<div className={joinStrings(
			'flex flex-col flex-grow py-5 items-center justify-center text-gray-400',
			styles['empty-content'],
		)}>
			<SwitchHorizontalIcon className='w-14 h-14' />
			<p className='text-2xl font-semibold mt-4'>
				Add your first transaction!
			</p>
		</div>
	)
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
	//TODO:newFeature-incomes Сделать две кнопки: "Add expense", "Add income"
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