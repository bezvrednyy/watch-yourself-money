import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {StandardError} from '../../../../../../backFrontJoint/common/errors'
import {declareAloneAction} from '../../../../../common/declareAloneAction'
import {verify} from '../../../../../../common/utils/verify'
import {editableCategoryIdAtom} from '../../../../model/categoriesAtom'
import {updateMainSpaceDataAction} from '../../../../model/updateMainSpaceDataAction'
import {EditCategoryPopupSubcategoryData, editCategoryPopupAtoms} from './editCategoryPopupAtoms'
import {toast} from 'react-hot-toast'

type SaveDataParams = {
	closeFn: () => void,
	saveTransactions?: boolean,
}

export const editCategoryPopupSaveData = declareAloneAction<SaveDataParams>(async (store, {
	closeFn,
	saveTransactions = false,
}) => {
	const {titleAtom, statusesAtom, iconIdAtom, subcategoriesAtom, colorIdAtom} = editCategoryPopupAtoms
	const subcategories = store.getState(subcategoriesAtom)
	store.dispatch(statusesAtom.setSaving())
	const editedSubcategories: Array<EditCategoryPopupSubcategoryData> = []
	subcategories.forEach(x => {
		if (x.changeType === 'edited') {
			editedSubcategories.push(x)
		}
		else if (x.changeType === 'turnToMain') {
			editedSubcategories.push({...x, parentCategoryId: undefined})
		}
	})

	const removedSubcategoriesIds = subcategories.filter(x => x.changeType === 'removed').map(x => x.id)
	const either = await getClientApi().categories.editMainCategory({
		id: verify(store.getState(editableCategoryIdAtom)),
		iconId: store.getState(iconIdAtom),
		colorId: store.getState(colorIdAtom),
		title: store.getState(titleAtom),
		type: 'EXPENSES', //TODO:newFeature добавить категории тип "Доходы"
		editedSubcategories,
		newSubcategories: subcategories.filter(x => x.changeType === 'new'),
		removedSubcategoriesData: removedSubcategoriesIds.length
			? {
				ids: removedSubcategoriesIds,
				saveTransactions,
			}
			: undefined,
	})

	either
		.mapRight(async () => {
			await updateMainSpaceDataAction(store)
			toast.success('Категория успешно обновлена.')
			closeFn()
			store.dispatch(statusesAtom.setNormal())
		})
		.mapLeft(error => {
			if (error.type === 'CATEGORY_NOT_FOUND') {
				toast.error('Категория уже не существует.')
				updateMainSpaceDataAction(store)
			}
			else {
				processStandardError(error)
			}
			store.dispatch(statusesAtom.setNormal())
			closeFn()
		})
})


type RemoveCategoryParams = {
	turnSubcategoriesToMain?: boolean,
	closeFn: () => void,
}

export const editCategoryPopupRemoveCategory = declareAloneAction<RemoveCategoryParams>(async (store, {
	closeFn,
	turnSubcategoriesToMain = false,
}) => {
	const {statusesAtom} = editCategoryPopupAtoms
	store.dispatch(statusesAtom.setRemoving())

	const either = await getClientApi().categories.removeMainCategory({
		categoryId: verify(store.getState(editableCategoryIdAtom)),
		turnSubcategoriesToMain,
	})

	either
		.mapRight(async () => {
			await updateMainSpaceDataAction(store)
			closeFn()
			store.dispatch(statusesAtom.setNormal())
		})
		.mapLeft(error => {
			if (error.type === 'CATEGORY_NOT_FOUND') {
				toast.error('Категория уже не существует.')
				updateMainSpaceDataAction(store)
			}
			else if (error.type === 'LAST_MAIN_CATEGORY') {
				toast.error('Нельзя удалить последнюю категорию')
			}
			else {
				processStandardError(error as StandardError)
			}
			store.dispatch(statusesAtom.setNormal())
			closeFn()
		})
})