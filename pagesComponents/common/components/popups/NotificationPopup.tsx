import {Button} from '../../uikit/button/Button'
import {PopupDefault} from '../../uikit/PopupDefault'

type NotificationPopupProps = {
	show: boolean,
	description: string,
	onAccept?: () => void,
	onCancel?: () => void,
	additionalButtons?: Array<JSX.Element>,
}

export function NotificationPopup({
	show,
	description,
	onAccept,
	onCancel,
	additionalButtons,
}: NotificationPopupProps) {
	const buttons = []
	!!onAccept && buttons.push(<Button
		key='ok'
		style='blue-default'
		onClick={onAccept}
		structure='text'
		text='Ok'
	/>)
	!!additionalButtons && buttons.push(...additionalButtons)
	!!onCancel && buttons.push(<Button
		key='cancel'
		style='secondary'
		onClick={onCancel}
		structure='text'
		text='Cancel'
	/>)

	//TODO:improvements
	return <PopupDefault
		createContent={() => (
			<div className=''>
				<p className=''>
					{description}
				</p>
			</div>
		)}
		buttons={buttons}
		show={show}
	/>
}