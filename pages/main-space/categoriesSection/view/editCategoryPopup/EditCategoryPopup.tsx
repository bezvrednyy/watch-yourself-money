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
		onClose={props.onClose}
		createJSX={() => <EditCategoryPopupContent />}
	/>
}

function useInitPopupAtoms() {
	const [categories] = useAtom(categoriesAtom)
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)
	const handleSetSubcategories = useAction(editCategoryPopupAtoms.subcategoriesAtom.set)

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
	}, [
		categories,
		editableCategoryId,
		handleSetSubcategories,
		handleSetTitle,
	])
}