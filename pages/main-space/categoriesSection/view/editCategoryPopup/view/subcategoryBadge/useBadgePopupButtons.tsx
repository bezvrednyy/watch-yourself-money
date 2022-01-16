import {useAction} from '@reatom/react'
import {Button} from '../../../../../../../commonClient/uikit/button/Button'
import {OutlineIconId} from '../../../../../../../commonClient/uikit/icons/getOutlineIconById'
import {EditCategoryPopupSubcategoryData, editCategoryPopupAtoms} from '../../model/editCategoryPopupAtoms'

type UseBadgePopupButtonsParams = EditCategoryPopupSubcategoryData & {
	newTitle: string,
	newIconId: OutlineIconId,
	setShow: (v: boolean) => void
}

export function useBadgePopupButtons({
	setShow,
	newTitle,
	newIconId,
	...props
}: UseBadgePopupButtonsParams): Array<JSX.Element> {
	const changeType = props.changeType
	const handleUpdateSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.updateSubcategory)
	const handleRemoveSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.remove)
	const handleTurnInMainSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.turnInMain)

	const updateFn = () => {
		handleUpdateSubcategory({
			...props,
			iconId: newIconId,
			title: newTitle,
		})
		setShow(false)
	}
	const removeFn = () => {
		handleRemoveSubcategory(props.id)
		setShow(false)
	}
	const turnInMainFn = () => {
		handleTurnInMainSubcategory(props.id)
		setShow(false)
	}

	const buttons: Array<JSX.Element> = []

	if (changeType === 'removed') {
		buttons.push(<Button key='restore' style='blue-default' onClick={updateFn} structure='text' text='Restore' />)
	}
	else if (changeType === 'turnInMain') {
		buttons.push(<Button key='turnInSub' style='blue-default' onClick={updateFn} structure='text' text='Turn in sub' />)
	}
	else {
		buttons.push(<Button key='save' style='blue-default' onClick={updateFn} structure='text' text='Save' />)
		buttons.push(<Button key='remove' style='destructure' onClick={removeFn} structure='text' text='Remove' />)
		if (changeType === 'default') {
			buttons.push(<Button key='turnInMain' style='secondary' onClick={turnInMainFn} structure='text' text='Turn in main' />)
		}
	}

	buttons.push(<Button key='close' style='secondary' onClick={() => setShow(false)} structure='text' text='Cancel'/>)
	return buttons
}