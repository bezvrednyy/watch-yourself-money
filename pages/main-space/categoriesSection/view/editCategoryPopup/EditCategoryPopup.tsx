import {useAction, useAtom} from '@reatom/react'
import {PopupDefault} from '../../../../../components/PopupDefault'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {categoriesAtom, editableCategoryIdAtom} from '../../model/categoriesAtom'
import {verify} from '../../../../../common/verify'
import {useEffect} from 'react'
import {EditCategoryPopupContent} from './EditCategoryPopupContent'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
}

export function EditCategoryPopup({
	show,
	onClose,
}: EditCategoryPopupProps) {
	useInitPopupAtoms()

	return <PopupDefault
		show={show}
		createContent={() => <EditCategoryPopupContent />}
		buttons={[
			<button
				key={'close'}
				type='button'
				className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
				onClick={onClose}
			>
				Save
			</button>,
		]}
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