import {Menu} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {joinStrings} from '../../../../../common/utils/string'
import {verify} from '../../../../../common/utils/verify'
import {useAloneAction} from '../../../../../commonClient/declareAloneAction'
import {Button} from '../../../../../commonClient/uikit/button/Button'
import {MenuDefault} from '../../../../../commonClient/uikit/MenuDefault'
import {PopupDefault} from '../../../../../commonClient/uikit/PopupDefault'
import {TextWithEllipsis} from '../../../../../commonClient/uikit/TextWithEllipsis'
import {bankAccountsAtom} from '../../../model/bankAccountsAtom'
import {removeBankAccountAction} from './model/externalActions'
import {removeBankAccountPopupAtoms} from './model/removeBankAccountPopupAtoms'

const REMOVE_ITEM_ID = 'remove'
const REMOVE_ITEM_TEXT = 'Не сохранять'

export function RemoveBankAccountPopup() {
	const [removableBankAccountId] = useAtom(removeBankAccountPopupAtoms.removableBankAccountIdAtom)
	const handleSetRemovableAccountIdAtom = useAction(removeBankAccountPopupAtoms.removableBankAccountIdAtom.set)
	const handleRemoveBankAccount = useAloneAction(removeBankAccountAction)

	return <PopupDefault
		createContent={() => <Content />}
		buttons={[
			<Button
				key='remove'
				style='destructure'
				onClick={handleRemoveBankAccount}
				structure='text'
				text='Remove'
			/>,
			<Button
				key='cancel'
				style='secondary'
				onClick={() => handleSetRemovableAccountIdAtom(null)}
				structure='text'
				text='Cancel'
			/>,
		]}
		show={!!removableBankAccountId}
		className='overflow-visible px-7'
	/>
}

function Content() {
	const [removableBankAccountId] = useAtom(removeBankAccountPopupAtoms.removableBankAccountIdAtom)
	const [bankAccounts] = useAtom(bankAccountsAtom)
	const [selectedAccountId] = useAtom(removeBankAccountPopupAtoms.movingTransactionsAccountIdAtom)
	const selectedBankAccount = selectedAccountId && verify(bankAccounts.find(x => x.id === selectedAccountId))

	const items = [
		<BankAccountItem key={REMOVE_ITEM_ID} id={REMOVE_ITEM_ID} title={REMOVE_ITEM_TEXT} />,
		...bankAccounts
			.filter(x => x.id !== removableBankAccountId)
			.map(x => <BankAccountItem key={x.id} id={x.id} title={x.name} />),
	]

	return (
		<div className='flex items-center mb-7 max-w-[400px]'>
			<p className='text-gray-800'>
				Можно сохранить транзакции удаляемого счёта:
			</p>
			<MenuDefault
				className='mx-2 grow focus:outline-none'
				popoverClass='w-44 bg-violet-200 bg-opacity-90'
				createButton={() => (
					<div className={joinStrings(
						'group inline-flex justify-center items-center w-36 py-1 text-md font-medium text-violet-500 opacity-90',
						'transition hover:opacity-100 underline',
					)}>
						<TextWithEllipsis
							text={selectedBankAccount ? selectedBankAccount.name : REMOVE_ITEM_TEXT}
							className='flex-grow'
						/>
						<ChevronDownIcon
							className='w-5 h-5 ml-2 flex-shrink-0 group-hover:opacity-100'
							aria-hidden='true'
						/>
					</div>
				)}
				items={items}
			/>
		</div>
	)
}

type MenuItemProps = {
	id: string,
	title: string,
}

function BankAccountItem({
	id,
	title,
}: MenuItemProps) {
	const handleSetSelectedAccountId = useAction(removeBankAccountPopupAtoms.movingTransactionsAccountIdAtom.set)

	return (
		<Menu.Item onClick={() => handleSetSelectedAccountId(id === REMOVE_ITEM_ID ? null : id)}>
			{({active}) => (
				<button className={joinStrings(
					'flex justify-between rounded-md items-center w-full px-3 py-1 text-sm',
					active ? 'bg-violet-400 text-white' : 'text-gray-900',
				)}>
					<TextWithEllipsis text={title} />
				</button>
			)}
		</Menu.Item>
	)
}