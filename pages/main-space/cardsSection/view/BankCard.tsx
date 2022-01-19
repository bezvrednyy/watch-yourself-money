import {useAtom} from '@reatom/react'
import {getColorById} from '../../../../common/colors/theme'
import {joinStrings} from '../../../../common/utils/string'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../commonClient/environment/userSettingsAtom'
import {BankAccountData} from '../../model/bankAccountsAtom'
import {TrashIcon} from '@heroicons/react/outline'
import {TextField} from '../../../../commonClient/uikit/textField/TextField'
import {TextWithEllipsis} from '../../../../commonClient/uikit/TextWithEllipsis'
import {useState} from 'react'

function BankCard({
	name,
	colorId,
	money,
}: BankAccountData) {
	const [title, setTitle] = useState(name)
	const [userSettings] = useAtom(userSettingsAtom)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return (
		<div
			className='flex box-border w-full px-8 py-4 rounded-full cursor-pointer shadow-lg'
			style={{'backgroundColor': getColorById(colorId)}}
		>
			<div className={'flex flex-col flex-grow'}>
				<TextField
					value={title}
					onInput={setTitle}
					style={'simple'}
					inputClass='bg-transparent leading-5 font-bold text-xl text-gray-800 font-sans'
					onBlur={() => {
						//TODO:cash Сохранить новое имя, если оно изменилось. Но сперва trimAll.
					}}
				/>
				<TextWithEllipsis
					className='leading-5 text-gray-600 pl-2.5'
					text={`Balance: ${money} ${currencySymbol}`}
				/>
			</div>
			<TrashIcon className={joinStrings(
				'w-6 h-6 ml-2 self-center shrink-0 text-gray-800',
				'hover:text-red-500 transition',
			)}/>
		</div>
	)
}

export {
	BankCard,
}