import {joinClassNames} from '../common/joinClassNames'

type RoundedSquareProps = {
	createIcon?: () => JSX.Element,
	title?: string,
	onClick?: () => void,
	bgHexColor?: string,
	className?: string,
}

function RoundedSquare({
	createIcon,
	title,
	onClick,
	bgHexColor,
	className,
}: RoundedSquareProps) {
	return (
		<div
			onClick={onClick}
			className={joinClassNames(className, 'flex flex-col items-center')}
			title={title}
		>
			{createIcon && <Icon createIcon={createIcon} bgHexColor={bgHexColor} />}
		</div>
	)
}

type IconProps = {
	createIcon: () => JSX.Element,
	bgHexColor?: string,
}

function Icon({
	createIcon,
	bgHexColor,
}: IconProps) {
	return (
		<div
			className='flex justify-center items-center rounded shadow'
			style={bgHexColor ? {'backgroundColor': bgHexColor} : undefined}
		>
			{createIcon()}
		</div>
	)
}

export {
	RoundedSquare,
}