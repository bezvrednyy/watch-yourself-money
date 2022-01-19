import {Logger} from '../../../common/utils/Logger'
import {TextFieldDefault} from './TextFieldDefault'
import {TextFieldLink} from './TextFieldLink'
import type {TextFieldProps} from './textFieldProps'
import {TextFieldSimple} from './TextFieldSimple'

function TextField(props: TextFieldProps) {
	const style = props.style
	switch (style) {
		case 'default':
			return TextFieldDefault(props)
		case 'link':
			return TextFieldLink(props)
		case 'simple':
			return TextFieldSimple(props)
		default:
			Logger.error(`Unknown text field style: ${style}`)
			return null
	}
}

export {
	TextField,
}