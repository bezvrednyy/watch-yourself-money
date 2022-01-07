import {joinClassNames} from '../common/joinClassNames'

type TextWithEllipsis = {
	text: string,
	className?: string,
}

function TextWithEllipsis({
	text,
	className,
}: TextWithEllipsis) {
	return (
		<span
			className={joinClassNames(
				'overflow-hidden text-ellipsis whitespace-nowrap',
				className,
			)}
		>
			{text}
		</span>
	)
}

export {
	TextWithEllipsis,
}