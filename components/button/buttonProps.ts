type ButtonStyle = 'primary'

type ButtonWithTextProps = {
	style: ButtonStyle,
	structure: 'text'
	text: string,
}

type ButtonProps = ButtonWithTextProps

export type {
	ButtonProps,
	ButtonWithTextProps,
}