import {declareAsyncAction} from '../../../../../../common/declareAsyncAction'
import {verify} from '../../../../../../common/verify'
import {UpdateCategoriesInfoRequest} from '../../../../../api/categories/update_categories_info'
import {editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from './editableCategoryAtom'

type SaveDataParams = {
	onClose: () => void,
}

export const editCategoryPopupSaveData = declareAsyncAction<SaveDataParams>((store, {onClose}) => {
	const {titleAtom, statusesAtom, iconIdAtom, editedSubcategoryIdsSetAtom, newSubcategoriesIdsSetAtom,
		subcategoriesAtom, haveBecomeMainCategoriesIdsSetAtom, colorIdAtom, removedSubcategoryIdsSetAtom,
	} = editCategoryPopupAtoms

	store.dispatch(statusesAtom.setSaving())

	const editedSubcategoryIds = store.getState(editedSubcategoryIdsSetAtom)
	const newSubcategoriesIds = store.getState(newSubcategoriesIdsSetAtom)

	const data: UpdateCategoriesInfoRequest = {
		id: verify(store.getState(editableCategoryIdAtom)),
		iconId: store.getState(iconIdAtom),
		colorId: store.getState(colorIdAtom),
		name: store.getState(titleAtom),
		editedSubcategories: store.getState(subcategoriesAtom).filter(x => editedSubcategoryIds.has(x.id)),
		newSubcategories: store.getState(subcategoriesAtom).filter(x => newSubcategoriesIds.has(x.id)),
		removedSubcategoryIds: [...store.getState(removedSubcategoryIdsSetAtom)],
		haveBecomeMainCategoriesIds: [...store.getState(haveBecomeMainCategoriesIdsSetAtom)],
	}

	onClose()
	console.log(data) //TODO:Сделать апи, куда отправлять данные.
})