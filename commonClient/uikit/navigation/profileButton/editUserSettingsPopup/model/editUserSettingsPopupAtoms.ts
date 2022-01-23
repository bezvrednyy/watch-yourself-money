import {createBooleanAtom} from '@reatom/core/primitives'

const showPopupAtom = createBooleanAtom(false)

export const editUserSettingsPopupAtoms = {
	showPopupAtom,
}