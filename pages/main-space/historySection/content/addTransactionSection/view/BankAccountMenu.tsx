import {Menu} from '@headlessui/react'
import {useAtom} from '@reatom/react'
import {joinClassNames} from '../../../../../../common/joinClassNames'
import {verify} from '../../../../../../common/verify'
import {MenuDefault} from '../../../../../../uikit/MenuDefault'
import {TextWithEllipsis} from '../../../../../../uikit/TextWithEllipsis'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../../environment/userSettingsAtom'
import {bankAccountsAtom} from '../../../../model/bankAccountsAtom'
import {addTransactionSectionAtoms} from '../model/addTransactionSectionAtoms'

export function BankAccountMenu() {
	const [bankAccounts] = useAtom(bankAccountsAtom)
	const [selectedBankAccountId] = useAtom(addTransactionSectionAtoms.selectedBankAccountId)
	const selectedBankAccount = verify(bankAccounts.find(x => x.id === selectedBankAccountId))

	return (
		<MenuDefault
			className='mx-2 grow'
			popoverClass='w-44 bg-blue-100'
			createButton={() => (
				<div className={joinClassNames(
					'inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-800 rounded-md',
					'hover:text-indigo-500',
				)}>
					{selectedBankAccount.name}
				</div>
			)}
			items={bankAccounts.map(x => <BankAccountItem key='item' {...x}/>)}
		/>
	)
}

type MenuItemProps = {
	name: string,
	money: number,
}

function BankAccountItem({
	name,
	money,
}: MenuItemProps) {
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return (
		<Menu.Item>
			{({active}) => (
				<button className={joinClassNames(
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