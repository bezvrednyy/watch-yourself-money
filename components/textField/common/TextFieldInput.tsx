import {TextFieldInputProps} from '../textFieldProps'

export function TextFieldInput({
	value,
	onInput,
	required,
	maxLength,
	placeholder,
	inputType,
	inputClass,
}: TextFieldInputProps) {
	return (
		<input
			value={value}
			onInput={event => onInput(event.currentTarget.value)}
			required={required}
			className={inputClass}
			placeholder={placeholder}
			maxLength={maxLength}
			type={inputType}
		/>
	)
}