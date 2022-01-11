import {Logger} from '../../../common/utils/Logger'
import {TextFieldDefault} from './TextFieldDefault'
import {TextFieldLink} from './TextFieldLink'
import type {TextFieldProps} from './textFieldProps'

function TextField(props: TextFieldProps) {
	const style = props.style
	switch (style) {
		case 'default':
			return TextFieldDefault(props)
		case 'link':
			return TextFieldLink(props)
		default:
			Logger.error(`Unknown text field style: ${style}`)
			return null
	}
}

export {
	TextField,
}