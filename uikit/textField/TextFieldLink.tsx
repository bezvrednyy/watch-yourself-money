import {useState} from 'react'
import {joinStrings} from '../../common/string'
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
		<div className={joinStrings(
			'flex justify-between border-b',
			focused ? 'border-b-indigo-500' : 'border-b-gray-300',
		)}>
			<TextFieldInput
				{...inputProps}
				inputType={inputType}
				inputClass={joinStrings(
					'appearance-none relative block w-full placeholder-gray-500 text-gray-900',
					'focus:outline-none',
					inputClass,
					getClassBySize(size),
				)}
				onFocus={() => setFocused(true)}
				onBlur={() => setFocused(false)}
			/>
			{createIcon && (
				<div className={joinStrings(
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