import {Preloader} from '../../../../common/uikit/preloader/Preloader'
import commonStyles from '../common/common.module.css'
import {isNumber} from '../../../../../common/utils/number'
import {formatMoney} from '../../../../../common/utils/productUtils'
import {joinStrings, removeSpaces} from '../../../../../common/utils/string'
import {PlusIcon} from '@heroicons/react/solid'
import {useCallback, useState} from 'react'
import {useAloneAction} from '../../../../common/declareAloneAction'
import {TextField} from '../../../../common/uikit/textField/TextField'
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline'
import {useAction, useAtom} from '@reatom/react'
import {addAccountButtonAtoms} from './model/addAccountButtonAtoms'
import {createBankAccountAction} from './model/externalActions'

function AddAccountButton() {
	const [status] = useAtom(addAccountButtonAtoms.statusesAtom)
	const [errorsSet] = useAtom(addAccountButtonAtoms.errorsSetAtom)
	const handleSetOpened = useAction(addAccountButtonAtoms.statusesAtom.setOpened)

	function getContent(): JSX.Element {
		if (status === 'normal') {
			return <PlusIcon className={joinStrings(
				'w-10 h-10 ml-2 text-gray-800',
				'group-hover:text-green-500 transition',
			)}/>
		}
		if (status === 'saving') {
			return <Preloader />
		}
		return <AddAccountContent />
	}

	function getWrapperStyles() {
		const hasError = [...errorsSet].length
		if (hasError) {
			return `shadow-lg shadow-red-200 ${commonStyles['bank-account-shake']}`
		}
		return joinStrings(
			status === 'normal' ? 'shadow-lg' : 'shadow-xl',
			'hover:shadow-xl transition duration-300',
		)
	}

	return (
		<div
			className={joinStrings(
				'group flex box-border w-full px-8 h-20 rounded-full items-center justify-center shrink-0',
				'cursor-pointer bg-purple-50',
				getWrapperStyles(),
			)}
			onClick={handleSetOpened}
		>
			{getContent()}
		</div>
	)
}

function AddAccountContent() {
	const [name, setName] = useState('')
	const [balance, setBalance] = useState('')
	const [focused, setFocused] = useState(false)
	const [errorsSet] = useAtom(addAccountButtonAtoms.errorsSetAtom)
	const handleSetNormal = useAction(addAccountButtonAtoms.statusesAtom.setNormal)
	const handleClearErrors = useAction(addAccountButtonAtoms.errorsSetAtom.clear)
	const handleRemoveError = useAction(addAccountButtonAtoms.errorsSetAtom.removeError)
	const handleCreateAccount = useAloneAction(createBankAccountAction)

	const onBalanceInput = useCallback((value: string) => {
		if (value === '') {
			setBalance(value)
			return
		}
		if (errorsSet.has('invalidBalance')) {
			handleRemoveError('invalidBalance')
		}
		const stringNumber = removeSpaces(value)
		if (!isNumber(stringNumber)) return
		setBalance(formatMoney(stringNumber))
	}, [errorsSet, handleRemoveError])

	const onNameInput = useCallback((value: string) => {
		if (errorsSet.has('invalidName')) {
			handleRemoveError('invalidName')
		}
		setName(value)
	}, [errorsSet, handleRemoveError])

	return (<>
		<div className='flex flex-col flex-grow'>
			<TextField
				value={name}
				onInput={onNameInput}
				style={'simple'}
				inputClass={joinStrings(
					'bg-transparent leading-5 font-bold text-xl font-sans placeholder:text-slate-900',
					errorsSet.has('invalidName') ? 'placeholder:text-red-400 text-red-400' : 'text-slate-900',
				)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
				placeholder={focused ? '' : 'Tinkof'}
			/>
			<div className={joinStrings(
				'flex items-center leading-5 pl-2.5',
				errorsSet.has('invalidBalance') ? 'text-red-400' : 'text-slate-800',
			)}>
				<span className='mr-1'>Balance:</span>
				<TextField
					value={balance}
					onInput={onBalanceInput}
					style='simple'
					inputClass={joinStrings(
						'bg-transparent leading-5 font-sans w-[70px] placeholder:text-slate-800',
						errorsSet.has('invalidBalance') ? 'placeholder:text-red-400' : 'text-slate-700',
					)}
					placeholder='0'
				/>
			</div>
		</div>
		<CheckCircleIcon
			className='w-6 h-6 ml-1.5 shrink-0 text-green-400 transition hover:text-green-600'
			onClick={event => {
				event.stopPropagation()
				handleCreateAccount({
					name,
					balance,
				})
			}}
		/>
		<XCircleIcon
			className='w-6 h-6 ml-0.5 shrink-0 text-red-400 transition hover:text-red-600'
			onClick={event => {
				event.stopPropagation()
				handleSetNormal()
				handleClearErrors()
			}}
		/>
	</>)
}

export {
	AddAccountButton,
}