import {joinStrings} from '../../../common/utils/string'
import {TextFieldDescription} from './common/TextFieldDescription'
import {TextFieldInput} from './common/TextFieldInput'
import {TextFieldDefaultProps, TextFieldSize} from './textFieldProps'

function TextFieldDefault({
	label,
	description,
	errorMessage,
	inputType = 'text',
	inputClass,
	size = 'normal',
	...inputProps
}: TextFieldDefaultProps) {
	const descriptionText = errorMessage || description

	return (
		<div className='w-full'>
			{label && <Label text={label} />}
			<TextFieldInput
				{...inputProps}
				inputType={inputType}
				inputClass={joinStrings(
					'appearance-none rounded-md relative block w-full border-gray-300 placeholder-gray-500 text-gray-900',
					'focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10',
					inputClass,
					getClassBySize(size),
				)}
			/>
			{descriptionText && <TextFieldDescription text={descriptionText} isError={!!errorMessage}/>}
		</div>)
}

type LabelProps = {
	text: string,
}

function Label({
	text,
}: LabelProps) {
	return <label>{text}</label>
}

function getClassBySize(size: TextFieldSize) {
	switch (size) {
		case 'normal':
			return 'px-3 py-2 border-2'
		case 'xLarge':
			return '' //TODO:uikit
	}
}

export {
	TextFieldDefault,
}