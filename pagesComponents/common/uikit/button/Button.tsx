import {Logger} from '../../../../common/utils/Logger'
import type {ButtonProps} from './buttonProps'
import {ButtonWithText} from './buttons/ButtonWithText'

export function Button(props: ButtonProps) {
	switch (props.structure) {
		case 'text':
			return ButtonWithText(props)
		default:
			Logger.error(`Unknown button structure: ${props.structure}`)
			return null
	}
}