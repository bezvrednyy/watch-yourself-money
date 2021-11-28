import {Logger} from '../../common/Logger'
import type {ButtonProps} from './buttonProps'
import {ButtonWithText} from './ButtonWithText'

function Button(props: ButtonProps) {
	switch (props.structure) {
		case 'text':
			return ButtonWithText(props)
		default:
			Logger.error(`Unknown button structure: ${props.structure}`)
			return null
	}
}

export {
	Button,
}