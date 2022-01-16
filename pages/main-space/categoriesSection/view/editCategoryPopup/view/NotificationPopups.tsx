import {useAction, useAtom } from '@reatom/react'
import {joinStrings} from '../../../../../../common/utils/string'
import {NotificationPopup} from '../../../../../../commonClient/components/popups/NotificationPopup'
import {useAsyncAction} from '../../../../../../commonClient/declareAsyncAction'
import {Button} from '../../../../../../commonClient/uikit/button/Button'
import {editCategoryPopupAtoms} from '../model/editCategoryPopupAtoms'
import {editCategoryPopupRemoveCategory, editCategoryPopupSaveData} from '../model/externalActions'

function RemoveCategoryNotificationPopup() {
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const [openedNotificationPopup] = useAtom(editCategoryPopupAtoms.openedNotificationPopupAtom)
	const [externalHandlers] = useAtom(editCategoryPopupAtoms.externalHandlersAtom)
	const handleCloseNotificationPopup = useAction(editCategoryPopupAtoms.openedNotificationPopupAtom.setClosed)
	const handleRemoveCategory = useAsyncAction(editCategoryPopupRemoveCategory)

	const closeFn = () => {
		handleCloseNotificationPopup()
		externalHandlers.onClose()
	}

	const additionalButtons: Array<JSX.Element> = []
	subcategories.length && additionalButtons.push(<Button
		key='turnInMain'
		style='blue-default'
		structure='text'
		text='Turn in main'
		onClick={() => handleRemoveCategory({ closeFn })}
	/>)
	additionalButtons.push(<Button
		key='remove'
		style='destructure'
		structure='text'
		text='Remove'
		onClick={() => handleRemoveCategory({
			closeFn,
			removeSubcategories: true,
		})}
	/>)

	return <NotificationPopup
		show={openedNotificationPopup === 'removeCategory'}
		onCancel={() => handleCloseNotificationPopup()}
		description={joinStrings(
			'При удалении категории удаляться все её транзакции.',
			subcategories.length ? 'Что сделать с подкатегориями?' : '',
		)}
		additionalButtons={additionalButtons}
	/>
}

function RemoveSubcategoriesNotificationPopup() {
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const [openedNotificationPopup] = useAtom(editCategoryPopupAtoms.openedNotificationPopupAtom)
	const [externalHandlers] = useAtom(editCategoryPopupAtoms.externalHandlersAtom)
	const handleCloseNotificationPopup = useAction(editCategoryPopupAtoms.openedNotificationPopupAtom.setClosed)
	const handleSaveData = useAsyncAction(editCategoryPopupSaveData)

	const closeFn = () => {
		handleCloseNotificationPopup()
		externalHandlers.onClose()
	}

	const additionalButtons: Array<JSX.Element> = []
	subcategories.length && additionalButtons.push(<Button
		key='moveToParent'
		style='blue-default'
		structure='text'
		text='Move to parent'
		onClick={() => handleSaveData({ closeFn, saveTransactions: true })}
	/>)
	additionalButtons.push(<Button
		key='remove'
		style='destructure'
		structure='text'
		text='Remove'
		onClick={() => handleSaveData({ closeFn })}
	/>)

	return <NotificationPopup
		show={openedNotificationPopup === 'removeSubcategory'}
		onCancel={() => handleCloseNotificationPopup()}
		description='Что сделать с транзакциями удаляемых подкатегорий?'
		additionalButtons={additionalButtons}
	/>
}

export {
	RemoveCategoryNotificationPopup,
	RemoveSubcategoriesNotificationPopup,
}