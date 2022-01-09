import {Menu} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/solid'
import {useAtom} from '@reatom/react'
import {joinClassNames} from '../../../../../../common/joinClassNames'
import {MenuDefault} from '../../../../../../components/MenuDefault'
import {TextWithEllipsis} from '../../../../../../components/TextWithEllipsis'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../../environment/userSettingsAtom'
import {bankAccountsAtom} from '../../../../model/bankAccountsAtom'

export function BankAccountMenu() {
	const [bankAccounts] = useAtom(bankAccountsAtom)

	return (
		<MenuDefault
			popoverClass='w-44 bg-blue-100'
			createButton={() => (
				<div className={joinClassNames(
					'inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20',
					'hover:bg-opacity-30',
				)}>
					Text
					<ChevronDownIcon
						className='w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100'
						aria-hidden='true'
					/>
				</div>
			)}
			items={bankAccounts.map(x => <BankAccountItem key='item'{...x}/>)}
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
					{`${money}${currencySymbol}`}
				</button>
			)}
		</Menu.Item>
	)
}