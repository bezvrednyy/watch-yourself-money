import {Menu} from '@headlessui/react'
import {useAction, useAtom} from '@reatom/react'
import {joinStrings} from '../../../../../../common/utils/string'
import {verify} from '../../../../../../common/utils/verify'
import {MenuDefault} from '../../../../../../commonClient/uikit/MenuDefault'
import {TextWithEllipsis} from '../../../../../../commonClient/uikit/TextWithEllipsis'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../../commonClient/environment/userSettingsAtom'
import {bankAccountsAtom} from '../../../../model/bankAccountsAtom'
import {transactionPanelAtoms} from '../model/transactionPanelAtoms'

export function BankAccountMenu() {
	const [bankAccounts] = useAtom(bankAccountsAtom)
	const [selectedBankAccountId] = useAtom(transactionPanelAtoms.selectedBankAccountId)
	const selectedBankAccount = verify(bankAccounts.find(x => x.id === selectedBankAccountId))

	return (
		<MenuDefault
			className='mx-2 grow'
			popoverClass='w-44 bg-blue-100'
			createButton={() => (
				<div className={joinStrings(
					'inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-800 rounded-md',
					'hover:text-indigo-500',
				)}>
					{selectedBankAccount.name}
				</div>
			)}
			items={bankAccounts.map(x => <BankAccountItem key={x.id} {...x}/>)}
		/>
	)
}

type MenuItemProps = {
	id: string,
	name: string,
	money: number,
}

function BankAccountItem({
	id,
	name,
	money,
}: MenuItemProps) {
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)
	const handleSetSelectedBankAccountId = useAction(transactionPanelAtoms.selectedBankAccountId.set)

	return (
		<Menu.Item onClick={() => handleSetSelectedBankAccountId(id)}>
			{({active}) => (
				<button className={joinStrings(
					'flex justify-between rounded-md items-center w-full px-3 py-1 text-sm',
					active ? 'bg-violet-400 text-white' : 'text-gray-900',
				)}>
					<TextWithEllipsis text={name} />
					{`${money} ${currencySymbol}`}
				</button>
			)}
		</Menu.Item>
	)
}