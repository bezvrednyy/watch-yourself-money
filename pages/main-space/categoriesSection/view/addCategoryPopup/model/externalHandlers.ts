import {CreateCategoryRequestData} from '../../../../../../backFrontJoint/contracts/categories/createCategoryContract'
import {declareAsyncAction} from '../../../../../../common/declareAsyncAction'
import {verify} from '../../../../../../common/verify'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {addCategoryPopupAtoms} from './addCategoryPopupAtoms'

type SaveDataParams = {
	onClose: () => void,
}

export const addCategoryPopupSaveData = declareAsyncAction<SaveDataParams>(async (store, {onClose}) => {
	const {categoryIdAtom, titleAtom, statusesAtom, iconIdAtom, subcategoriesAtom, colorIdAtom} = addCategoryPopupAtoms
	const title = store.getState(titleAtom)
	if (!title) {
		return
	}

	store.dispatch(statusesAtom.setSaving())

	const colorId = store.getState(colorIdAtom)
	const data: CreateCategoryRequestData = {
		id: verify(store.getState(categoryIdAtom)),
		iconId: store.getState(iconIdAtom),
		colorId,
		title,
		type: 'EXPENSES', //TODO:newFeature добавить категории тип "Доходы"
		subcategories: store.getState(subcategoriesAtom).map(
			x => ({...x, colorId}),
		),
	}

	const either = await getClientApi().categories.createCategory(data)
	console.log(either)
	return either
		.mapRight(rightData => {
			//TODO:toast
			console.log(rightData)
			store.dispatch(statusesAtom.setNormal())
			onClose()
		})
		.mapLeft(error => {
			store.dispatch(statusesAtom.setNormal())
			onClose()
			processStandardError(error)
		})
})