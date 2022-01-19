import {joinStrings} from '../../../common/utils/string'
import {TextFieldInput} from './common/TextFieldInput'
import {TextFieldSimpleProps} from './textFieldProps'

function TextFieldSimple({
	inputType = 'text',
	inputClass,
	className,
	...inputProps
}: TextFieldSimpleProps) {
	return (
		<div className={joinStrings('flex justify-between', className)}>
			<TextFieldInput
				{...inputProps}
				inputType={inputType}
				inputClass={joinStrings(
					'appearance-none relative block w-full placeholder-gray-500',
					'focus:outline-none',
					inputClass,
				)}
				onFocus={inputProps.onFocus}
				onBlur={inputProps.onBlur}
			/>
		</div>)
}

export {
	TextFieldSimple,
}