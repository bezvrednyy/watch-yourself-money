import {useAction} from '@reatom/react'
import {EditUserSettingsPopup} from './editUserSettingsPopup/EditUserSettingsPopup'
import {editUserSettingsPopupAtoms} from './editUserSettingsPopup/model/editUserSettingsPopupAtoms'

export function ProfileButton() {
	const handleShowUserSettingsPopup = useAction(editUserSettingsPopupAtoms.showPopupAtom.setTrue)
	return (
		<div>
			<button onClick={handleShowUserSettingsPopup}>Avatar and username</button>
			<EditUserSettingsPopup/>
		</div>
	)
}