type ButtonWithTextStyle = 'primary'|'blue-default'|'destructure'|'secondary'
type ButtonType = 'normal'|'preloader'|'disabled'
type ButtonSize = 'normal'|'small'

type ButtonWithTextProps = {
	type?: ButtonType,
	style: ButtonWithTextStyle,
	onClick: () => void,
	structure: 'text'
	text: string,
	size?: ButtonSize,
}

type ButtonProps = ButtonWithTextProps

export type {
	ButtonSize,
	ButtonProps,
	ButtonWithTextProps,
	ButtonWithTextStyle,
}