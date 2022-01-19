type TextFieldStyle = 'default'|'link'|'simple'

type TextFieldType = 'text'|'password'|'email'|'number'

type TextFieldInputProps = {
	value: string,
	onInput: (v: string) => void,
	maxLength?: number,
	placeholder?: string,
	required?: boolean,
	inputType?: TextFieldType,
	className?: string,
	inputClass?: string,
	onFocus?: () => void,
	onBlur?: () => void,
}

type TextFieldDefaultProps = TextFieldInputProps & {
	style: 'default',
	label?: string,
	description?: string,
	errorMessage?: string,
}

type TextFieldLinkProps = TextFieldInputProps & {
	style: 'link',
	createIcon?: () => JSX.Element,
}

type TextFieldSimpleProps = TextFieldInputProps & {
	style: 'simple'
}

type TextFieldProps = TextFieldDefaultProps
	|TextFieldLinkProps
	|TextFieldSimpleProps

export type {
	TextFieldProps,
	TextFieldDefaultProps,
	TextFieldInputProps,
	TextFieldLinkProps,
	TextFieldSimpleProps,
}