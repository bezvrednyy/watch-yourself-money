import {checkNever} from '../../../common/checkNever'
import {joinStrings} from '../../../common/string'
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
			return joinStrings(
				'relative w-full flex justify-center py-2 px-4 text-sm font-medium text-white',
				'bg-indigo-600 border border-transparent rounded-md',
				'hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
			)
		case 'blue-default':
			return joinStrings(
				'inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900',
				'bg-blue-100 border border-transparent rounded-md',
				' hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500',
			)
		case 'destructure':
			return joinStrings(
				'inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900',
				'bg-red-100 border border-transparent rounded-md',
				' hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500',
			)
		case 'secondary':
			return joinStrings(
				'inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-900',
				'bg-gray-100 border border-transparent rounded-md',
				' hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500',
			)
		default:
			checkNever(style, `Unknown style: ${style}`)
			return ''
	}
}

export {
	ButtonWithText,
}