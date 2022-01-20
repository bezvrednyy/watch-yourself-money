import {joinStrings} from '../../../../common/utils/string'
import {PlusIcon} from '@heroicons/react/solid'
import {useRef} from 'react'
import {useAloneAction} from '../../../../commonClient/declareAloneAction'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../commonClient/environment/userSettingsAtom'
import {useEventHandler} from '../../../../commonClient/hooks/useEventHandler'
import {TextField} from '../../../../commonClient/uikit/textField/TextField'
import {CheckCircleIcon, XCircleIcon} from '@heroicons/react/outline'
import {useAction, useAtom} from '@reatom/react'
import {addAccountButtonAtoms} from '../model/addAccountButtonAtoms'
import {cardsSectionExternalActions} from '../model/externalActions'

function AddAccountButton() {
	const [status] = useAtom(addAccountButtonAtoms.statusesAtom)
	const handleSetOpened = useAction(addAccountButtonAtoms.statusesAtom.setOpened)
	const handleCreateCard = useAloneAction(cardsSectionExternalActions.createBankCard)

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

	const ref = useRef<HTMLDivElement>(null)
	useEventHandler(ref, 'keydown', event => {
		if (event.code === 'Enter') {
			handleCreateCard()
			console.log('save bank card')
		}
	})

	return (
		<div
			ref={ref}
			className={joinStrings(
				'group flex box-border w-full px-8 py-3 rounded-full items-center justify-center',
				'cursor-pointer hover:bg-white hover:shadow-xl transition duration-300',
				status === 'normal' ? 'bg-slate-50 shadow-lg' : 'bg-white shadow-xl'
			)}
			onClick={handleSetOpened}
		>
			{getContent()}
		</div>
	)
}

function AddAccountContent() {
	const [name] = useAtom(addAccountButtonAtoms.nameAtom)
	const [balance] = useAtom(addAccountButtonAtoms.balanceAtom)
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)
	const handleSetNormal = useAction(addAccountButtonAtoms.statusesAtom.setNormal)
	const handleSetName = useAction(addAccountButtonAtoms.nameAtom.set)
	const handleSetBalance = useAction(addAccountButtonAtoms.balanceAtom.set)
	const handleCreateCard = useAloneAction(cardsSectionExternalActions.createBankCard)

	return (<>
		<div className={'flex flex-col flex-grow'}>
			<TextField
				value={name}
				onInput={handleSetName}
				style={'simple'}
				inputClass={joinStrings(
					'bg-transparent leading-5 font-bold text-xl text-slate-900 font-sans',
					'group-hover:text-white',
				)}
			/>
			<div className='leading-5 pl-2.5 text-slate-700'>
				<span>Balance:</span>
				<TextField
					value={balance}
					onInput={handleSetBalance}
					style='simple'
					inputType='number'
					inputClass={joinStrings(
						'bg-transparent leading-5 font-bold text-xl text-slate-900 font-sans',
						'group-hover:text-white',
					)}
				/>
				<span>{currencySymbol}</span>
			</div>
		</div>
		<CheckCircleIcon
			className='w-6 h-6 ml-2 shrink-0 text-green-400 transition hover:text-green-600'
			onClick={() => handleCreateCard()}
		/>
		<XCircleIcon
			className='w-6 h-6 ml-2 shrink-0 text-red-400 transition hover:text-red-600'
			onClick={handleSetNormal}
		/>
	</>)
}

export {
	AddAccountButton,
}