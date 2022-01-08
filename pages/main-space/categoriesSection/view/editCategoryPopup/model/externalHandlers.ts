import {declareAsyncAction} from '../../../../../../common/declareAsyncAction'
import {verify} from '../../../../../../common/verify'
import {getEnvType} from '../../../../../../prisma/environment'
import {UpdateCategoriesInfoRequest} from '../../../../../api/categories/update_category_info'
import {editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from './editableCategoryAtom'

type SaveDataParams = {
	onClose: () => void,
}

export const editCategoryPopupSaveData = declareAsyncAction<SaveDataParams>(async (store, {onClose}) => {
	const {titleAtom, statusesAtom, iconIdAtom, editedSubcategoryIdsSetAtom, newSubcategoriesIdsSetAtom,
		subcategoriesAtom, haveBecomeMainCategoriesIdsSetAtom, colorIdAtom, removedSubcategoryIdsSetAtom,
	} = editCategoryPopupAtoms
	const haveBecomeMainCategoriesIdsSet = store.getState(haveBecomeMainCategoriesIdsSetAtom)
	const removedSubcategoryIdsSet = store.getState(removedSubcategoryIdsSetAtom)

	store.dispatch(statusesAtom.setSaving())

	const editedSubcategoryIds = store.getState(editedSubcategoryIdsSetAtom)
	const newSubcategoriesIds = store.getState(newSubcategoriesIdsSetAtom)

	const data: UpdateCategoriesInfoRequest = {
		id: verify(store.getState(editableCategoryIdAtom)),
		iconId: store.getState(iconIdAtom),
		colorId: store.getState(colorIdAtom),
		name: store.getState(titleAtom),
		editedSubcategories: store.getState(subcategoriesAtom)
			.filter(x => editedSubcategoryIds.has(x.id))
			.map(x => (haveBecomeMainCategoriesIdsSet.has(x.id)
				? { ...x, parentCategoryId: undefined }
				: x),
			),
		newSubcategories: store.getState(subcategoriesAtom)
			.filter(x => newSubcategoriesIds.has(x.id) && !removedSubcategoryIdsSet.has(x.id))
			.map(x => (haveBecomeMainCategoriesIdsSet.has(x.id)
				? { ...x, parentCategoryId: undefined }
				: x),
			),
		removedSubcategoryIds: [...removedSubcategoryIdsSet],
	}

	//TODO: Either вместо исключений
	const res = await fetch('/api/categories/update_category_info', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=utf-8',
		},
		body: JSON.stringify({
			data,
		}),
	})

	if (getEnvType() !== 'production') {
		console.log(data)
		console.log(res)
	}

	if (res.ok) {
		onClose()
	}
})