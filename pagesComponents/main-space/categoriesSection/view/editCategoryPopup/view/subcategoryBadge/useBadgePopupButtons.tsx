import {useAction} from '@reatom/react'
import {Button} from '../../../../../../common/uikit/button/Button'
import {OutlineIconId} from '../../../../../../common/uikit/icons/getOutlineIconById'
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
	const handleTurnToMainSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.turnToMain)

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
	const turnToMainFn = () => {
		handleTurnToMainSubcategory(props.id)
		setShow(false)
	}

	const buttons: Array<JSX.Element> = []

	if (changeType === 'removed') {
		buttons.push(<Button key='restore' style='blue-default' onClick={updateFn} structure='text' text='Restore' />)
	}
	else if (changeType === 'turnToMain') {
		buttons.push(<Button key='turnToSub' style='blue-default' onClick={updateFn} structure='text' text='Turn to sub' />)
	}
	else {
		buttons.push(<Button key='save' style='blue-default' onClick={updateFn} structure='text' text='Save' />)
		buttons.push(<Button key='remove' style='destructure' onClick={removeFn} structure='text' text='Remove' />)
		if (changeType === 'default') {
			buttons.push(<Button key='turnToMain' style='secondary' onClick={turnToMainFn} structure='text' text='Turn to main' />)
		}
	}

	buttons.push(<Button key='close' style='secondary' onClick={() => setShow(false)} structure='text' text='Cancel'/>)
	return buttons
}