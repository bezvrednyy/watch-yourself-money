import {useAtom} from '@reatom/react'
import {joinStrings, trimAll} from '../../../../../common/utils/string'
import {useAloneAction} from '../../../../../commonClient/declareAloneAction'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../commonClient/environment/userSettingsAtom'
import {BankAccountData} from '../../../model/bankAccountsAtom'
import {TrashIcon} from '@heroicons/react/outline'
import {TextField} from '../../../../../commonClient/uikit/textField/TextField'
import {TextWithEllipsis} from '../../../../../commonClient/uikit/TextWithEllipsis'
import {useState} from 'react'
import {editBankCardAction} from './model/externalActions'

type BankCardProps = BankAccountData & {
	canRemove: boolean,
}

function BankAccount({
	id,
	name,
	money,
	canRemove,
}: BankCardProps) {
	const [focused, setFocused] = useState(false)
	const [title, setTitle] = useState(name)
	const [hasTitleError, setHasTitleError] = useState(false)
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)
	const handleEditBankAccount = useAloneAction(editBankCardAction)

	function onBlur() {
		setFocused(false)
		if (title === name) return
		const preparedName = trimAll(title)
		if (!preparedName) {
			setHasTitleError(true)
			return
		}
		handleEditBankAccount({
			id,
			name: preparedName
		})
	}

	function getTextColorClass() {
		if (hasTitleError) {
			return 'placeholder:text-red-400 text-red-400'
		}
		return focused ? 'text-white' : 'text-slate-100'
	}

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
					onInput={value => {
						setTitle(value)
						setHasTitleError(false)
					}}
					style='simple'
					inputClass={joinStrings(
						'bg-transparent leading-5 font-bold text-xl font-sans',
						'group-hover:text-white',
						getTextColorClass(),
					)}
					onBlur={onBlur}
					onFocus={() => setFocused(true)}
					placeholder='Tinkof'
				/>
				<TextWithEllipsis
					className={joinStrings(
					'leading-5 pl-2.5 group-hover:text-slate-50',
						focused ? 'text-slate-50' : 'text-slate-100'
					)}
					text={`Balance: ${money} ${currencySymbol}`}
				/>
			</div>
			{canRemove && <TrashIcon className={joinStrings( //TODO:cards 1. Заменить крестиком, при редактировании 2. Добавить прелоадер при запросе редактирования/удалении
				'w-6 h-6 ml-2 shrink-0 transition hover:text-red-600',
				focused ? 'text-white' : 'text-gray-50'
			)}/>}
		</div>
	)
}

export {
	BankAccount,
}