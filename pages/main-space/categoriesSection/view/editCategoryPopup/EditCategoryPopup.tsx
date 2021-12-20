import {ExternalLayer} from '../../../../../components/layers/ExternalLayer'
import {useAction, useAtom} from '@reatom/react'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {categoriesAtom, editableCategoryIdAtom} from '../../model/categoriesAtom'
import {verify} from '../../../../../common/verify'
import {useEffect} from 'react'
import {EditCategoryPopupContent} from './EditCategoryPopupContent'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
	onSave: () => void,
}

export function EditCategoryPopup(props: EditCategoryPopupProps) {
	useInitPopupAtoms()

	return <ExternalLayer
		show={props.show}
		createJSX={() => <EditCategoryPopupContent {...props} />}
	/>
}

function useInitPopupAtoms() {
	const [categories] = useAtom(categoriesAtom)
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)
	const handleSetSubcategories = useAction(editCategoryPopupAtoms.subcategoriesAtom.set)
	const handleSetColor = useAction(editCategoryPopupAtoms.colorAtom.set)
	const handleSetIcon = useAction(editCategoryPopupAtoms.iconIdAtom.set)

	useEffect(() => {
		if (editableCategoryId === null) {
			return
		}

		const category = verify(
			categories.find(x => x.id === editableCategoryId),
			`Unexpected error: category not found`,
		)
		handleSetTitle(category.title)
		handleSetSubcategories(
			categories.filter(x => x.parentCategoryId === category.id),
		)
		handleSetColor(category.hexColor)
		handleSetIcon(category.iconId)
	}, [categories, editableCategoryId, handleSetColor, handleSetIcon, handleSetSubcategories, handleSetTitle])
}