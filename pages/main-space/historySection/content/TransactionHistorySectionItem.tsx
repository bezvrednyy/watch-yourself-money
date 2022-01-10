import {joinClassNames} from '../../../../common/joinClassNames'
import {getCurrencySymbolById, userSettingsAtom} from '../../../../environment/userSettingsAtom'
import {categoriesAtom} from '../../model/categoriesAtom'
import {useAtom} from '@reatom/react'
import {verify} from '../../../../common/verify'
import {RoundedSquare} from '../../../../components/RoundedSquare'
import {getOutlineIconById} from '../../../../components/icons/getOutlineIconById'
import {getColorById} from '../../../../common/colors/theme'

type ViewTransactionInfo = {
	id: string,
	categoryId: string,
	bankCardName: string,
	money: number,
	comment?: string,
}

type TransitionHistorySectionItemProps = ViewTransactionInfo & {
	onClick: (id: string) => void,
}

function TransactionHistorySectionItem({
	id,
	bankCardName,
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
		<div className='flex items-center cursor-pointer px-4 py-1.5 hover:bg-gray-100' onClick={() => onClick(id)}>
			<RoundedSquare
				createIcon={() => <Icon className='m-2 w-7 h-7 overflow-hidden'/>}
				bgHexColor={getColorById(category.colorId)}
				rounded='full'
				className='mr-5 opacity-90 transform transition hover:opacity-100 shadow'
			/>
			<div>
				<p className={joinClassNames('text-gray-800', titleClassName)}>
					{category.title}
				</p>
				<p className={hintClassName}>{comment ? `${bankCardName} | ${comment}` : bankCardName}</p>
			</div>
			<p className={joinClassNames('flex flex-row-reverse text-purple-500 font-factor self-start flex-grow ml-4', titleClassName)}>
				{`${money} ${currencySymbol}`}
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