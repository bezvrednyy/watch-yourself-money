import styles from './AddAccountButton.module.css'
import {isNumber} from '../../../../../common/utils/number'
import {formatMoney} from '../../../../../common/utils/productUtils'
import {joinStrings, removeSpaces} from '../../../../../common/utils/string'
import {PlusIcon} from '@heroicons/react/solid'
import {useCallback, useState} from 'react'
import {useAloneAction} from '../../../../../commonClient/declareAloneAction'
import {TextField} from '../../../../../commonClient/uikit/textField/TextField'
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline'
import {useAction, useAtom} from '@reatom/react'
import {addAccountButtonAtoms} from './model/addAccountButtonAtoms'
import {cardsSectionExternalActions} from './model/externalActions'

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
		//TODO:improvements Добавить preloader при 'saving'
		return <AddAccountContent/>
	}

	function getWrapperStyles() {
		console.log('update')
		const hasError = [...errorsSet].length
		if (hasError) {
			return `shadow-lg shadow-red-200 bg-white ${styles['card-error']}`
		}
		return joinStrings(
			status === 'normal' ? 'bg-slate-50 shadow-lg' : 'bg-white shadow-xl',
			'hover:shadow-xl transition duration-300',
		)
	}

	return (
		<div
			className={joinStrings(
				'group flex box-border w-full px-8 h-20 rounded-full items-center justify-center',
				'cursor-pointer hover:bg-white',
				getWrapperStyles()
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
	const [errorsSet] = useAtom(addAccountButtonAtoms.errorsSetAtom)
	const handleSetNormal = useAction(addAccountButtonAtoms.statusesAtom.setNormal)
	const handleClearErrors = useAction(addAccountButtonAtoms.errorsSetAtom.clear)
	const handleRemoveError = useAction(addAccountButtonAtoms.errorsSetAtom.removeError)
	const handleCreateCard = useAloneAction(cardsSectionExternalActions.createBankCard)

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
	}, [errorsSet])

	const onNameInput =  useCallback((value: string) => {
		if (errorsSet.has('invalidName')) {
			handleRemoveError('invalidName')
		}
		setName(value)
	}, [errorsSet])

	return (<>
		<div className='flex flex-col flex-grow'>
			<TextField
				value={name}
				onInput={onNameInput}
				style={'simple'}
				inputClass={joinStrings(
				'bg-transparent leading-5 font-bold text-xl font-sans',
					errorsSet.has('invalidName') ? 'placeholder:text-red-400 text-red-400' : 'text-slate-900'
				)}
				placeholder='Tinkof'
			/>
			<div className={joinStrings(
				'flex items-center leading-5 pl-2.5',
				errorsSet.has('invalidBalance') ? 'text-red-400' : 'text-slate-700',
			)}>
				<span className='mr-1'>Balance:</span>
				<TextField
					value={balance}
					onInput={onBalanceInput}
					style='simple'
					inputClass={joinStrings(
						'bg-transparent leading-5 font-sans',
						errorsSet.has('invalidBalance') ? 'placeholder:text-red-400' : 'text-slate-700',
					)}
					placeholder='0'
				/>
			</div>
		</div>
		<CheckCircleIcon
			className='w-6 h-6 ml-2 shrink-0 text-green-400 transition hover:text-green-600'
			onClick={() => handleCreateCard({
				name,
				balance,
			})}
		/>
		<XCircleIcon
			className='w-6 h-6 ml-2 shrink-0 text-red-400 transition hover:text-red-600'
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