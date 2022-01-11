import {useAtom} from '@reatom/react'
import {getCurrencySymbolById, userSettingsAtom} from '../../environment/userSettingsAtom'
import {BankAccountData} from '../../../pages/main-space/model/bankAccountsAtom'

function BankCard({
	name,
	description,
	money,
}: BankAccountData) {
	const imageUrl = 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80'
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return (
		<div
			className='bg-white shadow-md rounded-3xl mx-3 w-72 h-40
				flex flex-row flex-shrink-0 justify-around items-center overflow-hidden'
		>
			<img className='w-1/2 h-full object-cover' src={imageUrl} alt='image'/>
			<div className='w-full pl-6 h-1/2 flex flex-col flex-1 items-baseline justify-around space-y-2'>
				<h1 className='text-lg font-normal mb-0 text-gray-600 font-sans'>
					{name}
				</h1>
				{!!description && (
					<p className='text-xs text-gray-500 w-4/5'>
						{description}
					</p>
				)}
				<div className='w-full flex justify-between items-center'>
					<h1 className='font-bold text-gray-500'>{`${money} ${currencySymbol}`}</h1>
				</div>
			</div>
		</div>
	)
}

export {
	BankCard,
}