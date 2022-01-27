import {useAction, useAtom} from '@reatom/react'
import {useAloneAction} from '../../../../common/declareAloneAction'
import {Button} from '../../../../common/uikit/button/Button'
import {PopupDefault} from '../../../../common/uikit/PopupDefault'
import {editCategoryPopupAtoms} from './model/editCategoryPopupAtoms'
import {categoriesAtom, editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {verify} from '../../../../../common/utils/verify'
import {useEffect} from 'react'
import {EditCategoryPopupContent} from './EditCategoryPopupContent'
import {editCategoryPopupSaveData} from './model/externalActions'
import {RemoveCategoryNotificationPopup, RemoveSubcategoriesNotificationPopup} from './view/NotificationPopups'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
}

export function EditCategoryPopup({
	show,
	onClose,
}: EditCategoryPopupProps) {
	useInitPopupAtoms(onClose)
	const buttons = useEditCategoryPopupButtons(onClose)

	return <PopupDefault
		show={show}
		createContent={() => <>
			<EditCategoryPopupContent />
			<RemoveCategoryNotificationPopup />
			<RemoveSubcategoriesNotificationPopup />
		</>}
		buttons={buttons}
		className='w-full max-w-md'
	/>
}

function useEditCategoryPopupButtons(onClose: () => void): Array<JSX.Element> {
	const handleSaveData = useAloneAction(editCategoryPopupSaveData)
	const handleOpenRemoveCategoryPopup = useAction(editCategoryPopupAtoms.openedNotificationPopupAtom.setRemoveCategory)
	const handleOpenRemoveSubcategoryPopup = useAction(editCategoryPopupAtoms.openedNotificationPopupAtom.setRemoveSubcategory)
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const hasRemovedSubcategories = !!subcategories.filter(x => x.changeType === 'removed').map(x => x.id).length

	return [
		<Button
			key='save'
			style='blue-default'
			onClick={() => {
				if (hasRemovedSubcategories) {
					handleOpenRemoveSubcategoryPopup()
				}
				else {
					handleSaveData({ closeFn: onClose })
				}
			}}
			structure='text'
			text='Save'
		/>,
		<Button
			key='remove'
			style='destructure'
			onClick={() => handleOpenRemoveCategoryPopup()}
			structure='text'
			text='Remove'
		/>,
		<Button
			key='close'
			style='secondary'
			onClick={onClose}
			structure='text'
			text='Cancel'
		/>,
	]
}

function useInitPopupAtoms(onClose: () => void) {
	const [categories] = useAtom(categoriesAtom)
	const {mainCategories, subCategories} = categories
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)
	const handleSetSubcategories = useAction(editCategoryPopupAtoms.subcategoriesAtom.set)
	const handleSetColor = useAction(editCategoryPopupAtoms.colorIdAtom.set)
	const handleSetIcon = useAction(editCategoryPopupAtoms.iconIdAtom.set)
	const handleSetExternalHandlers = useAction(editCategoryPopupAtoms.externalHandlersAtom.set)

	useEffect(() => {
		if (editableCategoryId === null) {
			return
		}

		const category = verify(
			mainCategories.find(x => x.id === editableCategoryId),
			`Unexpected error: category not found`,
		)
		if (!category) {
			return
		}
		handleSetTitle(category.title)
		handleSetSubcategories(
			subCategories.filter(x => x.parentCategoryId === category.id),
		)
		handleSetColor(category.colorId)
		handleSetIcon(category.iconId)
		handleSetExternalHandlers({ onClose })
	}, [
		mainCategories,
		subCategories,
		editableCategoryId,
		handleSetColor,
		handleSetIcon,
		handleSetSubcategories,
		handleSetTitle,
		handleSetExternalHandlers,
		onClose,
	])
}