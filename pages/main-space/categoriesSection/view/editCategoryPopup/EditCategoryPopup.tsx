import {useAction, useAtom} from '@reatom/react'
import {useAsyncAction} from '../../../../../common/declareAsyncAction'
import {Button} from '../../../../../components/button/Button'
import {PopupDefault} from '../../../../../components/PopupDefault'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {categoriesAtom, editableCategoryIdAtom} from '../../model/categoriesAtom'
import {verify} from '../../../../../common/verify'
import {useEffect} from 'react'
import {EditCategoryPopupContent} from './EditCategoryPopupContent'
import {editCategoryPopupSaveData} from './model/externalHandlers'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
}

export function EditCategoryPopup({
	show,
	onClose,
}: EditCategoryPopupProps) {
	useInitPopupAtoms()
	const handleSaveData = useAsyncAction(editCategoryPopupSaveData)

	return <PopupDefault
		show={show}
		createContent={() => <EditCategoryPopupContent />}
		buttons={[
			<Button
				key={'save'}
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
				key={'close'}
				style='secondary'
				onClick={onClose}
				structure='text'
				text='Cancel'
			/>,
		]}
		className='w-full max-w-md'
	/>
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