import {CreateCategoryRequestData} from '../../../../../../backFrontJoint/common/contracts/categories/createCategoryContract'
import {declareAloneAction} from '../../../../../common/declareAloneAction'
import {verify} from '../../../../../../common/utils/verify'
import {getClientApi, processStandardError} from '../../../../../../backFrontJoint/clientApi/clientApi'
import {simultaneousUpdateMainSpaceDataAction} from '../../../../model/asyncUpdateMainSpaceDataAction'
import {addCategoryPopupAtoms} from './addCategoryPopupAtoms'

type SaveDataParams = {
	onClose: () => void,
}

export const addCategoryPopupSaveData = declareAloneAction<SaveDataParams>(async (store, { onClose }) => {
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

	either
		.mapRight(async () => {
			await simultaneousUpdateMainSpaceDataAction(store, ['categories'])
			store.dispatch(statusesAtom.setNormal())
			onClose()
		})
		.mapLeft(error => {
			store.dispatch(statusesAtom.setNormal())
			onClose()
			processStandardError(error)
		})
})