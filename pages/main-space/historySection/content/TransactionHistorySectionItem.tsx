import {XIcon} from '@heroicons/react/outline'
import {joinClassNames} from '../../../../common/joinClassNames'

type MoneyInfo = {
	value: number,
	type: 'expense'|'income',
}

type ViewTransactionInfo = {
	id: string,
	categoryName: string,
	bankCardName: string,
	moneyInfo: MoneyInfo,
	comment?: string,
}

type TransitionHistorySectionItemProps = ViewTransactionInfo & {
	onClick: (id: string) => void,
}

function TransactionHistorySectionItem({
	id,
	bankCardName,
	categoryName,
	moneyInfo,
	comment,
	onClick,
}: TransitionHistorySectionItemProps) {
	const hintClassName = 'text-sm font-normal font-sans text-gray-500'
		+ ' group-hover:text-purple-600'
	const titleClassName = 'text-xl font-medium font-sans'
		+ ' transition group-hover:text-purple-600'
	return (
		<div className='group flex cursor-pointer px-10' onClick={() => onClick(id)}>
			<div>
				<p className={joinClassNames('text-gray-800', titleClassName)}>
					{categoryName}
				</p>
				<p className={hintClassName}>{bankCardName}</p>
			</div>
			<div className='flex-grow'>
				<p className={joinClassNames('flex flex-row-reverse text-green-500', titleClassName)}>
					{moneyInfo.value}
				</p>
				{comment && <p className={joinClassNames('flex flex-row-reverse', hintClassName)}>
					{comment}
				</p>}
			</div>
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