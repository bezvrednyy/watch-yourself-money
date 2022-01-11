import {XIcon} from '@heroicons/react/outline'
import {joinStrings} from '../common/utils/string'
import {TextWithEllipsis} from './TextWithEllipsis'

type BadgeProps = {
	label: string,
	cornerType?: 'regular'|'rounded',
	className?: string,
	createIcon?: () => JSX.Element,
	onRemove?: () => void,
	onClick?: () => void,
}

export function Badge({
	label,
	cornerType = 'regular',
	className,
	createIcon,
	onRemove,
	onClick,
}: BadgeProps) {
	return (
		<span
			className={joinStrings(
				'flex items-center text-black text-xs font-medium',
				'px-2 md:px-4 py-1 h-6',
				'duration-300 opacity-90 hover:opacity-100 cursor-pointer',
				className,
				cornerType === 'regular' ? 'rounded-sm' : 'rounded-full',
			)}
			onClick={onClick}
		>
			{!!createIcon && <div className='mr-1'>{createIcon()}</div>}
			<TextWithEllipsis text={label}/>
			{!!onRemove && <XIcon className='ml-2' onClick={onRemove} />}
		</span>
	)
}