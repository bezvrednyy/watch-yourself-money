import {formatMoney} from '../../../../common/utils/productUtils'
import {joinStrings} from '../../../../common/utils/string'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../commonClient/environment/userSettingsAtom'
import {categoriesAtom} from '../../model/categoriesAtom'
import {useAtom} from '@reatom/react'
import {verify} from '../../../../common/utils/verify'
import {RoundedSquare} from '../../../../commonClient/uikit/RoundedSquare'
import {getOutlineIconById} from '../../../../commonClient/uikit/icons/getOutlineIconById'
import {getColorById} from '../../../../common/colors/theme'

type ViewTransactionInfo = {
	id: string,
	categoryId: string,
	bankAccountName: string,
	money: number,
	comment?: string,
}

type TransitionHistorySectionItemProps = ViewTransactionInfo & {
	onClick: () => void,
}

function TransactionHistorySectionItem({
	bankAccountName,
	categoryId,
	money,
	comment,
	onClick,
}: TransitionHistorySectionItemProps) {
	const hintClassName = 'text-sm font-light font-sans text-gray-500'
	const titleClassName = 'text-lg font-light font-sans'
	const [categories] = useAtom(categoriesAtom)
	const [userSettings] = useAtom(userSettingsAtom)
	//Для определения EXPENSES/INCOMES использовать category
	const category = verify(
		categories.mainCategories.find(x => x.id === categoryId) || categories.subCategories.find(x => x.id === categoryId),
		'Error, in category not found!',
	)
	const Icon = getOutlineIconById(category.iconId)
	const currencySymbol = getCurrencySymbolById(userSettings.currencyId)

	return (
		<div className='flex items-center cursor-pointer px-6 py-1.5 hover:bg-gray-100' onClick={onClick}>
			<RoundedSquare
				createIcon={() => <Icon className='m-2 w-7 h-7 overflow-hidden'/>}
				bgHexColor={getColorById(category.colorId)}
				rounded='full'
				className='mr-5 opacity-90 transform transition hover:opacity-100 shadow'
			/>
			<div>
				<p className={joinStrings('text-gray-800', titleClassName)}>
					{category.title}
				</p>
				<p className={hintClassName}>{comment ? `${bankAccountName} | ${comment}` : bankAccountName}</p>
			</div>
			<p className={joinStrings('flex flex-row-reverse flex-grow shrink-0 text-purple-500 font-factor self-start ml-4', titleClassName)}>
				{`${formatMoney(money)} ${currencySymbol}`}
			</p>
		</div>
	)
}

export type {
	TransitionHistorySectionItemProps,
	ViewTransactionInfo,
}

export {
	TransactionHistorySectionItem,
}