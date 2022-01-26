import {useState} from 'react'
import {joinStrings} from '../../../../common/utils/string'
import {TextFieldInput} from './common/TextFieldInput'
import {TextFieldLinkProps} from './textFieldProps'

function TextFieldLink({
	inputType = 'text',
	inputClass,
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
				)}
				onFocus={() => {
					inputProps.onFocus && inputProps.onFocus()
					setFocused(true)
				}}
				onBlur={() => {
					inputProps.onBlur && inputProps.onBlur()
					setFocused(false)
				}}
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

export {
	TextFieldLink,
}