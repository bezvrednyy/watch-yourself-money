import commonStyles from '../common/common.module.css'
import {useAction, useAtom} from '@reatom/react'
import {formatMoney} from '../../../../../common/utils/productUtils'
import {joinStrings, trimAll} from '../../../../../common/utils/string'
import {useAloneAction} from '../../../../common/declareAloneAction'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../common/environment/userSettingsAtom'
import {Preloader} from '../../../../common/uikit/preloader/Preloader'
import {BankAccountData} from '../../../model/bankAccountsAtom'
import {TrashIcon, XCircleIcon} from '@heroicons/react/outline'
import {TextField} from '../../../../common/uikit/textField/TextField'
import {TextWithEllipsis} from '../../../../common/uikit/TextWithEllipsis'
import {useEffect, useState} from 'react'
import {editBankAccountAction} from './model/externalActions'
import {removeBankAccountPopupAtoms} from './model/removeBankAccountPopupAtoms'

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
	const handleSetRemovableAccountIdAtom = useAction(removeBankAccountPopupAtoms.removableBankAccountIdAtom.set)
	const showShakeAnimation = useShakeAnimation(money)

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
			name: preparedName,
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
					focused ? 'text-white' : 'text-gray-50',
				)}
				onClick={() => handleSetRemovableAccountIdAtom(id)}
			/>
		}
		return null
	}

	return (
		<div
			className={joinStrings(
				'group flex box-border w-full px-8 h-20 rounded-full items-center shrink-0',
				'cursor-pointer hover:shadow-xl hover:bg-black transition duration-300',
				focused ? 'bg-black shadow-xl' : 'bg-zinc-800 shadow-lg',
				showShakeAnimation ? commonStyles['bank-account-shake'] : '',
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
						focused ? 'text-slate-50' : 'text-slate-100',
					)}
					text={`Balance: ${formatMoney(money)} ${currencySymbol}`}
				/>
			</div>
			{getButton()}
		</div>
	)
}

function useShakeAnimation(currentMoney: number): boolean {
	const [previousMoney, setPreviousMoney] = useState<number|null>(null)
	const [showShake, setShowShake] = useState(false)

	useEffect(() => {
		if (previousMoney === currentMoney) {
			return
		}
		if (previousMoney === null)	{
			setPreviousMoney(currentMoney)
			return
		}
		setShowShake(true)
		setTimeout(() => setShowShake(false), 1000)
	}, [previousMoney, currentMoney])

	return showShake
}

export {
	BankAccount,
}