import {declareAsyncAction} from '../../../../../../common/declareAsyncAction'
import {verify} from '../../../../../../common/verify'
import {getEnvType} from '../../../../../../environment/environment'
import {CreateCategoryRequestData} from '../../../../../api/categories/create_category'
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
		type: 'EXPENSES', //TODO: IncomesFeature,
		subcategories: store.getState(subcategoriesAtom).map(
			x => ({...x, colorId}),
		),
	}

	//TODO: Either вместо исключений
	const res = await fetch('/api/categories/create_category', {
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
		//TODO: добавить тостер и обновление категорий
		onClose()
	}
	store.dispatch(statusesAtom.setNormal())
})