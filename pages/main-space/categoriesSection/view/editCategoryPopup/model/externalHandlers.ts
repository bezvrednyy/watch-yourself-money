import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {StandardError} from '../../../../../../backFrontJoint/common/errors'
import {declareAsyncAction} from '../../../../../../commonClient/declareAsyncAction'
import {verify} from '../../../../../../common/utils/verify'
import {editableCategoryIdAtom, updateCategoriesAction} from '../../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from './editableCategoryAtom'
import {toast} from 'react-hot-toast'

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

	const either = await getClientApi().categories.editMainCategory({
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
		.mapRight(async () => {
			toast.success('Категория успешно удалена.')
			onClose()
			store.dispatch(statusesAtom.setNormal())

			await updateCategoriesAction(store)
			toast.success('Категории обновлены')
		})
		.mapLeft(error => {
			if (error.type === 'CATEGORY_NOT_FOUND') {
				toast.error('Категория уже не существует.')
				updateCategoriesAction(store)
			}
			else if (error.type === 'LAST_MAIN_CATEGORY') {
				toast.error('Нельзя удалить последнюю категорию')
			}
			else {
				processStandardError(error as StandardError)
			}
			store.dispatch(statusesAtom.setNormal())
			onClose()
		})
})

//TODO:category. Реализовать экшн очистки атомов и использовать его в externalHandlers