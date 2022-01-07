type ButtonWithTextStyle = 'primary'|'blue-default'

type ButtonWithTextProps = {
	style: ButtonWithTextStyle,
	onClick: () => void,
	structure: 'text'
	text: string,
}

type ButtonProps = ButtonWithTextProps

export type {
	ButtonProps,
	ButtonWithTextProps,
	ButtonWithTextStyle,
}