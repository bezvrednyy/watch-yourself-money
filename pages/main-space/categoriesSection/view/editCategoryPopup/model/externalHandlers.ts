import {fetchPostData} from '../../../../../../backFrontJoint/clientApi/fetchPostData'
import {declareAsyncAction} from '../../../../../../common/declareAsyncAction'
import {verify} from '../../../../../../common/verify'
import {getEnvType} from '../../../../../../environment/environment'
import {RemoveCategoryRequestData} from '../../../../../api/categories/remove_main_category'
import {UpdateCategoriesInfoRequestData} from '../../../../../api/categories/update_category_info'
import {editableCategoryIdAtom} from '../../../../model/categoriesAtom'
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

	const data: UpdateCategoriesInfoRequestData = {
		id: verify(store.getState(editableCategoryIdAtom)),
		iconId: store.getState(iconIdAtom),
		colorId: store.getState(colorIdAtom),
		name: store.getState(titleAtom),
		type: 'EXPENSES', //TODO:newFeature добавить категории тип "Доходы"
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

	//TODO:Either
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
		//TODO:toast и обновление категорий
		onClose()
	}
	store.dispatch(statusesAtom.setNormal())
})


type RemoveCategoryParams = {
	removeSubcategories?: boolean,
	onClose: () => void,
}

export const editCategoryPopupRemoveCategory = declareAsyncAction<RemoveCategoryParams>(async (store, {
	onClose,
	removeSubcategories = false,
}) => {
	const {statusesAtom} = editCategoryPopupAtoms
	store.dispatch(statusesAtom.setSaving())

	const data: RemoveCategoryRequestData = {
		categoryId: verify(store.getState(editableCategoryIdAtom)),
		removeSubcategories,
	}

	//TODO:Either
	const res = await fetchPostData('/api/categories/remove_main_category', data)
	if (res.ok) {
		//TODO:toast и обновление категорий
		onClose()
	}
	store.dispatch(statusesAtom.setNormal())
})

//TODO:category. Реализовать экшн очистки атомов и использовать его в externalHandlers