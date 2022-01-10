type TextFieldStyle = 'default'|'link'

type TextFieldType = 'text'|'password'|'email'|'number'
type TextFieldSize = 'normal'|'xLarge'

type TextFieldInputProps = {
	value: string,
	onInput: (v: string) => void,
	maxLength?: number,
	placeholder?: string,
	required?: boolean,
	inputType?: TextFieldType,
	inputClass?: string,
	onFocus?: () => void,
	onBlur?: () => void,
}

type TextFieldDefaultProps = TextFieldInputProps & {
	style: 'default',
	size?: TextFieldSize,
	label?: string,
	description?: string,
	errorMessage?: string,
}

type TextFieldLinkProps = TextFieldInputProps & {
	style: 'link',
	size?: TextFieldSize,
	createIcon?: () => JSX.Element,
}

type TextFieldProps = TextFieldDefaultProps
	|TextFieldLinkProps

export type {
	TextFieldProps,
	TextFieldSize,
	TextFieldDefaultProps,
	TextFieldInputProps,
	TextFieldLinkProps,
}