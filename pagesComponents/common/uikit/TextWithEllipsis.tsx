import {joinStrings} from '../../../common/utils/string'

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
			className={joinStrings(
				'overflow-hidden text-ellipsis whitespace-nowrap',
				className,
			)}
			title={text}
		>
			{text}
		</span>
	)
}

export {
	TextWithEllipsis,
}