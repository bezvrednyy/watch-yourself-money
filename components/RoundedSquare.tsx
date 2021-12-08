import {joinClassNames} from '../common/joinClassNames'

type RoundedSquareProps = {
	icon?: JSX.Element,
	title?: string,
	onClick?: () => void,
	bgHexColor?: string,
	className?: string,
}

function RoundedSquare({
	icon,
	title,
	onClick,
	bgHexColor,
	className,
}: RoundedSquareProps) {
	return (
		<div
			onClick={onClick}
			className={joinClassNames(className, 'flex flex-col items-center opacity-90 transform transition'
				+ ' hover:scale-105 cursor-pointer hover:opacity-100')}
		>
			<div
				className='w-12 h-12 flex justify-center items-center rounded shadow'
				style={bgHexColor ? {'backgroundColor': bgHexColor} : undefined}
			>
				{icon}
			</div>
			{title && <div className='text-base font-normal text-gray-700 font-sans'>{title}</div>}
		</div>
	)
}

export {
	RoundedSquare,
}