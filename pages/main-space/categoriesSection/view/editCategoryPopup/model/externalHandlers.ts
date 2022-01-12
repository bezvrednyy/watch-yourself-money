import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {declareAsyncAction} from '../../../../../../commonClient/declareAsyncAction'
import {verify} from '../../../../../../common/utils/verify'
import {getEnvType} from '../../../../../../commonClient/environment/clientEnv'
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

	const either = await getClientApi().categories.removeMainCategory({
		categoryId: verify(store.getState(editableCategoryIdAtom)),
		removeSubcategories,
	})

	either
		.mapRight(() => {
			//TODO:toast и обновление категорий
			onClose()
			store.dispatch(statusesAtom.setNormal())
		})
		.mapLeft(error => {
			store.dispatch(statusesAtom.setNormal())
			onClose()
			processStandardError(error)
		})
})

//TODO:category. Реализовать экшн очистки атомов и использовать его в externalHandlers