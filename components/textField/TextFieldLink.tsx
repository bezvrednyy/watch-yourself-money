import {joinClassNames} from '../../common/joinClassNames'
import {TextFieldInput} from './common/TextFieldInput'
import {TextFieldLinkProps} from './textFieldProps'

function TextFieldLink({
	inputType = 'text',
	inputClass,
	...inputProps
}: TextFieldLinkProps) {
	return (
		<div className='w-full'>
			<TextFieldInput
				{...inputProps}
				inputType={inputType}
				inputClass={joinClassNames(
					'appearance-none relative block w-full px-1 border-b-2 border-b-gray-300 placeholder-gray-500 text-gray-900',
					'focus:outline-none focus:ring-indigo-500 focus:border-b-indigo-500 focus:z-10 sm:text-sm',
					inputClass,
				)}
			/>
		</div>)
}


export {
	TextFieldLink,
}