import {TextFieldInputProps, TextFieldSize} from '../textFieldProps'

export function TextFieldInput({
	value,
	onInput,
	required,
	maxLength,
	placeholder,
	inputType,
	inputClass,
	onFocus,
	onBlur,
}: TextFieldInputProps) {
	return (
		<input
			value={value}
			onInput={event => onInput(event.currentTarget.value)}
			onFocus={onFocus}
			onBlur={onBlur}
			required={required}
			className={inputClass}
			placeholder={placeholder}
			maxLength={maxLength}
			type={inputType}
		/>
	)
}