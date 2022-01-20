import {useAtom} from '@reatom/react'
import {joinStrings} from '../../../../common/utils/string'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../commonClient/environment/userSettingsAtom'
import {BankAccountData} from '../../model/bankAccountsAtom'
import {TrashIcon} from '@heroicons/react/outline'
import {TextField} from '../../../../commonClient/uikit/textField/TextField'
import {TextWithEllipsis} from '../../../../commonClient/uikit/TextWithEllipsis'
import {useState} from 'react'

function BankCard({
	name,
	money,
}: BankAccountData) {
	const [focused, setFocused] = useState(false)
	const [title, setTitle] = useState(name)
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return (
		<div
			className={joinStrings(
				'group flex box-border w-full px-8 h-20 rounded-full items-center',
				'cursor-pointer hover:shadow-xl hover:bg-black transition duration-300',
				focused ? 'bg-black shadow-xl' : 'bg-zinc-800 shadow-lg',
			)}
		>
			<div className={'flex flex-col flex-grow'}>
				<TextField
					value={title}
					onInput={setTitle}
					style={'simple'}
					inputClass={joinStrings(
						'bg-transparent leading-5 font-bold text-xl text-slate-100 font-sans',
						'group-hover:text-white',
						focused ? 'text-white' : 'text-slate-100'
					)}
					onBlur={() => {
						//TODO:cash Сохранить новое имя, если оно изменилось. Но сперва trimAll.
						setFocused(false)
					}}
					onFocus={() => setFocused(true)}
				/>
				<TextWithEllipsis
					className={joinStrings(
					'leading-5 pl-2.5 group-hover:text-slate-50',
						focused ? 'text-slate-50' : 'text-slate-100'
					)}
					text={`Balance: ${money} ${currencySymbol}`}
				/>
			</div>
			<TrashIcon className={joinStrings(
				'w-6 h-6 ml-2 shrink-0 transition hover:text-red-600',
				focused ? 'text-white' : 'text-gray-50'
			)}/>
		</div>
	)
}

export {
	BankCard,
}