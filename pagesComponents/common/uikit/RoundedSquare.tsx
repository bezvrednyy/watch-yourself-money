import {joinStrings} from '../../../common/utils/string'

type RoundedType = 'none'|'default'|'full'

type RoundedSquareProps = {
	createIcon?: () => JSX.Element,
	title?: string,
	onClick?: () => void,
	bgHexColor?: string,
	className?: string,
	rounded?: RoundedType,
}

function RoundedSquare({
	createIcon,
	title,
	onClick,
	bgHexColor,
	className,
	rounded = 'default',
}: RoundedSquareProps) {
	return (
		<div
			onClick={onClick}
			className={joinStrings(
				className,
				'flex items-center justify-center',
				getRoundedClass(rounded),
			)}
			style={bgHexColor ? {'backgroundColor': bgHexColor} : undefined}
			title={title}
		>
			{createIcon && <Icon createIcon={createIcon} rounded={rounded} />}
		</div>
	)
}

type IconProps = {
	createIcon: () => JSX.Element,
	rounded: RoundedType,
}

function Icon({
	createIcon,
	rounded,
}: IconProps) {
	return (
		<div
			className={joinStrings(
				'flex justify-center items-center',
				getRoundedClass(rounded),
			)}
		>
			{createIcon()}
		</div>
	)
}

function getRoundedClass(type: RoundedType): null|string {
	return type === 'none'
		? null
		: (type === 'full' ? 'rounded-full' : 'rounded')
}

export {
	RoundedSquare,
}