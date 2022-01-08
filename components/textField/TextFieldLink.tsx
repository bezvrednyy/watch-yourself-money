import {useState} from 'react'
import {joinClassNames} from '../../common/joinClassNames'
import {TextFieldInput} from './common/TextFieldInput'
import {TextFieldLinkProps, TextFieldSize} from './textFieldProps'

function TextFieldLink({
	inputType = 'text',
	inputClass,
	size = 'normal',
	createIcon,
	...inputProps
}: TextFieldLinkProps) {
	const [focused, setFocused] = useState(false)

	return (
		<div className={joinClassNames(
			'flex flex-between border-b',
			focused ? 'border-b-indigo-500' : 'border-b-gray-300',
		)}>
			<TextFieldInput
				{...inputProps}
				inputType={inputType}
				inputClass={joinClassNames(
					'appearance-none relative block w-full placeholder-gray-500 text-gray-900',
					'focus:outline-none',
					inputClass,
					getClassBySize(size),
				)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			{createIcon && (
				<div className={joinClassNames(
					'flex items-center',
					focused ? 'text-indigo-600' : 'text-gray-500',
				)}>
					{createIcon()}
				</div>
			)}
		</div>)
}

function getClassBySize(size: TextFieldSize) {
	switch (size) {
		case 'normal':
			return 'px-1 text-normal'
		case 'xLarge':
			return 'px-1 text-xl'
	}
}

export {
	TextFieldLink,
}