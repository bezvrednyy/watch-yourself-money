type TextFieldStyle = 'default'|'link'

type TextFieldType = 'text'|'password'|'email'|'number'

type TextFieldInputProps = {
	value: string,
	onInput: (v: string) => void,
	maxLength?: number,
	placeholder?: string,
	required?: boolean,
	inputType?: TextFieldType,
	inputClass?: string,
}

type TextFieldDefaultProps = TextFieldInputProps & {
	style: 'default',
	label?: string,
	description?: string,
	errorMessage?: string,
}

type TextFieldLinkProps = TextFieldInputProps & {
	style: 'link',
}

type TextFieldProps = TextFieldDefaultProps
	|TextFieldLinkProps

export type {
	TextFieldProps,
	TextFieldDefaultProps,
	TextFieldInputProps,
	TextFieldLinkProps,
}