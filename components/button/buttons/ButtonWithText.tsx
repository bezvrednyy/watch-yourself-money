import {checkNever} from '../../../common/checkNever'
import {joinClassNames} from '../../../common/joinClassNames'
import type {ButtonWithTextProps, ButtonWithTextStyle} from '../buttonProps'

function ButtonWithText({
	style,
	text,
	onClick,
}: ButtonWithTextProps) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={getClassByStyle(style)}
		>
			{text}
		</button>)
}

function getClassByStyle(style: ButtonWithTextStyle): string {
	switch (style) {
		case 'primary':
			return joinClassNames(
				'relative w-full flex justify-center py-2 px-4 text-sm font-medium text-white',
				'bg-indigo-600 border border-transparent rounded-md',
				'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
			)
		case 'blue-default':
			return joinClassNames(
				'inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900',
				'bg-blue-100 border border-transparent rounded-md',
				' hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
			)
		default:
			checkNever(style, `Unknown style: ${style}`)
			return ''
	}
}

export {
	ButtonWithText,
}