import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {StandardError} from '../../../../../../backFrontJoint/common/errors'
import {declareAsyncAction} from '../../../../../../commonClient/declareAsyncAction'
import {verify} from '../../../../../../common/utils/verify'
import {editableCategoryIdAtom, updateCategoriesAction} from '../../../../model/categoriesAtom'
import {EditCategoryPopupSubcategoryData, editCategoryPopupAtoms} from './editCategoryPopupAtoms'
import {toast} from 'react-hot-toast'

type SaveDataParams = {
	onClose: () => void,
}

export const editCategoryPopupSaveData = declareAsyncAction<SaveDataParams>(async (store, {onClose}) => {
	const {titleAtom, statusesAtom, iconIdAtom, subcategoriesAtom, colorIdAtom} = editCategoryPopupAtoms
	const subcategories = store.getState(subcategoriesAtom)
	store.dispatch(statusesAtom.setSaving())
	const editedSubcategories: Array<EditCategoryPopupSubcategoryData> = []
	subcategories.forEach(x => {
		if (x.changeType === 'edited') {
			editedSubcategories.push(x)
		}
		else if (x.changeType === 'turnInMain') {
			editedSubcategories.push({...x, parentCategoryId: undefined})
		}
	})

	const either = await getClientApi().categories.editMainCategory({
		id: verify(store.getState(editableCategoryIdAtom)),
		iconId: store.getState(iconIdAtom),
		colorId: store.getState(colorIdAtom),
		title: store.getState(titleAtom),
		type: 'EXPENSES', //TODO:newFeature добавить категории тип "Доходы"
		editedSubcategories,
		newSubcategories: subcategories.filter(x => x.changeType === 'new'),
		removedSubcategoryIds: subcategories
			.filter(x => x.changeType === 'removed')
			.map(x => x.id),
	})

	either
		.mapRight(async () => {
			await updateCategoriesAction(store)
			toast.success('Категория успешно обновлена.')
			onClose()
			store.dispatch(statusesAtom.setNormal())
		})
		.mapLeft(error => {
			if (error.type === 'CATEGORY_NOT_FOUND') {
				toast.error('Категория уже не существует.')
				updateCategoriesAction(store)
			}
			else {
				processStandardError(error)
			}
			store.dispatch(statusesAtom.setNormal())
			onClose()
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
			await updateCategoriesAction(store)
			onClose()
			store.dispatch(statusesAtom.setNormal())
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