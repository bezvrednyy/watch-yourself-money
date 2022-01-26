import {useAction, useAtom} from '@reatom/react'
import {Button} from '../../../button/Button'
import {PopupDefault} from '../../../PopupDefault'
import {editUserSettingsPopupAtoms} from './model/editUserSettingsPopupAtoms'

export function EditUserSettingsPopup() {
	const [show] = useAtom(editUserSettingsPopupAtoms.showPopupAtom)
	const handleClosePopup = useAction(editUserSettingsPopupAtoms.showPopupAtom.setFalse)

	return <PopupDefault
		createContent={() => <EditUserSettingsPopupContent />}
		buttons={[
			<Button
				key='save'
				style='blue-default'
				onClick={handleClosePopup}
				structure='text'
				text='Save'
			/>,
			<Button
				key='cancel'
				style='secondary'
				onClick={handleClosePopup}
				structure='text'
				text='Cancel'
			/>,
		]}
		show={show}
		className=''
	/>
}

function EditUserSettingsPopupContent() {
	return (
		<div>

		</div>
	)
}