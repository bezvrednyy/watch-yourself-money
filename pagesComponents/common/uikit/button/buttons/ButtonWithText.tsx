import {checkNever} from '../../../../../common/utils/checkNever'
import {joinStrings} from '../../../../../common/utils/string'
import {Preloader} from '../../preloader/Preloader'
import {TextWithEllipsis} from '../../TextWithEllipsis'
import type {ButtonSize, ButtonWithTextProps, ButtonWithTextStyle} from '../buttonProps'

function ButtonWithText({
	type = 'normal',
	size,
	style,
	text,
	onClick,
}: ButtonWithTextProps) {
	return (
		<button
			type='button'
			onClick={onClick}
			className={joinStrings(
				'flex-col',
				getClassByStyle(style),
				size && getClassBySize(size),
			)}
		>
			<TextWithEllipsis text={text} className={type === 'preloader' ? 'h-0 invisible' : undefined} />
			{type === 'preloader' && <Preloader className='w-[18px] h-[18px] self-center' />}
		</button>)
}

function getClassBySize(size: ButtonSize): string {
	switch (size) {
		case 'normal':
			return 'w-20'
		case 'small':
			return 'w-16'
		default:
			checkNever(size, `Unknown button size: ${size}`)
			return 'w-20'
	}
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