import {useAction, useAtom} from '@reatom/react'
import {useAsyncAction} from '../../../../../commonClient/declareAsyncAction'
import {joinStrings} from '../../../../../common/utils/string'
import {Button} from '../../../../../commonClient/uikit/button/Button'
import {PopupDefault} from '../../../../../commonClient/uikit/PopupDefault'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {categoriesAtom, editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {verify} from '../../../../../common/utils/verify'
import {useEffect} from 'react'
import {EditCategoryPopupContent} from './EditCategoryPopupContent'
import {editCategoryPopupRemoveCategory, editCategoryPopupSaveData} from './model/externalHandlers'
import {NotificationPopup} from '../../../../../commonClient/components/popups/NotificationPopup'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
}

export function EditCategoryPopup({
	show,
	onClose,
}: EditCategoryPopupProps) {
	useInitPopupAtoms()
	const buttons = useEditCategoryPopupButtons(onClose)

	return <PopupDefault
		show={show}
		createContent={() => <>
			<EditCategoryPopupContent />
			<RemoveNotificationPopup onClose={onClose} />
		</>}
		buttons={buttons}
		className='w-full max-w-md'
	/>
}

type RemoveNotificationPopupProps = {
	onClose: () => void,
}

function RemoveNotificationPopup({
	onClose,
}: RemoveNotificationPopupProps) {
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const [showNotificationPopup] = useAtom(editCategoryPopupAtoms.showNotificationPopupAtom)
	const handleCloseNotificationPopup = useAction(editCategoryPopupAtoms.showNotificationPopupAtom.setFalse)
	const handleRemoveCategory = useAsyncAction(editCategoryPopupRemoveCategory)

	const closeFn = () => {
		handleCloseNotificationPopup()
		onClose()
	}

	const additionalButtons: Array<JSX.Element> = []
	subcategories.length && additionalButtons.push(<Button
		key='turnInMain'
		style='blue-default'
		structure='text'
		text='Turn in main'
		onClick={() => handleRemoveCategory({ onClose: closeFn })}
	/>)
	additionalButtons.push(<Button
		key='remove'
		style='destructure'
		structure='text'
		text='Remove'
		onClick={() => handleRemoveCategory({
			onClose: closeFn,
			removeSubcategories: true,
		})}
	/>)

	return <NotificationPopup
		show={showNotificationPopup}
		onCancel={() => handleCloseNotificationPopup()}
		description={joinStrings(
			'При удалении категории удаляться все её транзакции.',
			subcategories.length ? 'Что сделать с подкатегориями?' : '',
		)}
		additionalButtons={additionalButtons}
	/>
}

function useEditCategoryPopupButtons(onClose: () => void): Array<JSX.Element> {
	const handleSaveData = useAsyncAction(editCategoryPopupSaveData)
	const handleShowNotificationPopup = useAction(editCategoryPopupAtoms.showNotificationPopupAtom.setTrue)

	return [
		<Button
			key='save'
			style='blue-default'
			onClick={() => {
				handleSaveData({
					onClose,
				})
			}}
			structure='text'
			text='Save'
		/>,
		<Button
			key='remove'
			style='destructure'
			onClick={() => handleShowNotificationPopup()}
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

function useInitPopupAtoms() {
	const [categories] = useAtom(categoriesAtom)
	const {mainCategories, subCategories} = categories
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)
	const handleSetSubcategories = useAction(editCategoryPopupAtoms.subcategoriesAtom.set)
	const handleSetColor = useAction(editCategoryPopupAtoms.colorIdAtom.set)
	const handleSetIcon = useAction(editCategoryPopupAtoms.iconIdAtom.set)

	useEffect(() => {
		if (editableCategoryId === null) {
			return
		}

		const category = verify(
			mainCategories.find(x => x.id === editableCategoryId),
			`Unexpected error: category not found`,
		)
		handleSetTitle(category.title)
		handleSetSubcategories(
			subCategories.filter(x => x.parentCategoryId === category.id),
		)
		handleSetColor(category.colorId)
		handleSetIcon(category.iconId)
	}, [
		mainCategories,
		subCategories,
		editableCategoryId,
		handleSetColor,
		handleSetIcon,
		handleSetSubcategories,
		handleSetTitle,
	])
}