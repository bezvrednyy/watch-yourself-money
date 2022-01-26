import {useAction, useAtom } from '@reatom/react'
import {joinStrings} from '../../../../../../common/utils/string'
import {NotificationPopup} from '../../../../../common/components/popups/NotificationPopup'
import {useAloneAction} from '../../../../../common/declareAloneAction'
import {Button} from '../../../../../common/uikit/button/Button'
import {editCategoryPopupAtoms} from '../model/editCategoryPopupAtoms'
import {editCategoryPopupRemoveCategory, editCategoryPopupSaveData} from '../model/externalActions'

function RemoveCategoryNotificationPopup() {
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const [openedNotificationPopup] = useAtom(editCategoryPopupAtoms.openedNotificationPopupAtom)
	const [externalHandlers] = useAtom(editCategoryPopupAtoms.externalHandlersAtom)
	const handleCloseNotificationPopup = useAction(editCategoryPopupAtoms.openedNotificationPopupAtom.setClosed)
	const handleRemoveCategory = useAloneAction(editCategoryPopupRemoveCategory)

	const closeFn = () => {
		handleCloseNotificationPopup()
		externalHandlers.onClose()
	}

	const additionalButtons: Array<JSX.Element> = []
	subcategories.length && additionalButtons.push(<Button
		key='turnToMain'
		style='blue-default'
		structure='text'
		text='Turn to main'
		onClick={() => handleRemoveCategory({ closeFn })}
	/>)
	additionalButtons.push(<Button
		key='remove'
		style='destructure'
		structure='text'
		text='Remove'
		onClick={() => handleRemoveCategory({
			closeFn,
			turnSubcategoriesToMain: true,
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
	const handleSaveData = useAloneAction(editCategoryPopupSaveData)

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