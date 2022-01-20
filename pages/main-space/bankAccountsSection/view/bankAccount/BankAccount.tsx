import {useAtom} from '@reatom/react'
import {joinStrings, trimAll} from '../../../../../common/utils/string'
import {useAloneAction} from '../../../../../commonClient/declareAloneAction'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../../commonClient/environment/userSettingsAtom'
import {Preloader} from '../../../../../commonClient/uikit/preloader/Preloader'
import {BankAccountData} from '../../../model/bankAccountsAtom'
import {TrashIcon, XCircleIcon} from '@heroicons/react/outline'
import {TextField} from '../../../../../commonClient/uikit/textField/TextField'
import {TextWithEllipsis} from '../../../../../commonClient/uikit/TextWithEllipsis'
import {useState} from 'react'
import {editBankAccountAction} from './model/externalActions'

type BankAccountProps = BankAccountData & {
	canRemove: boolean,
}

function BankAccount({
	id,
	name,
	money,
	canRemove,
}: BankAccountProps) {
	const [focused, setFocused] = useState(false)
	const [title, setTitle] = useState(name)
	const [hasTitleError, setHasTitleError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)
	const handleEditBankAccount = useAloneAction(editBankAccountAction)

	function onBlur() {
		setFocused(false)
		if (title === name) return
		const preparedName = trimAll(title)
		if (!preparedName) {
			setHasTitleError(true)
			return
		}
		setLoading(true)
		handleEditBankAccount({
			id,
			name: preparedName
		}).then(() => setLoading(false))
	}

	function getTextColorClass() {
		if (hasTitleError) {
			return 'placeholder:text-red-400 text-red-400'
		}
		return focused ? 'text-white' : 'text-slate-100'
	}

	function getButton(): JSX.Element|null {
		if (loading) {
			return <Preloader />
		}
		if (focused) {
			return <XCircleIcon
				className='w-6 h-6 ml-2 shrink-0 text-white transition hover:text-blue-300'
				onClick={() => {
					setFocused(false)
					setHasTitleError(false)
					setTitle(name)
				}}
			/>
		}
		if (canRemove) {
			return <TrashIcon
				className={joinStrings(
					'w-6 h-6 ml-2 shrink-0 transition hover:text-red-600',
					focused ? 'text-white' : 'text-gray-50'
				)}
				onClick={() => {}} //TODO:bankAccounts
			/>
		}
		return null
	}

	return (
		<div
			className={joinStrings(
				'group flex box-border w-full min-w-[284px] px-8 h-20 rounded-full items-center',
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
			{getButton()}
		</div>
	)
}

export {
	BankAccount,
}