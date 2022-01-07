import {createAtom} from '@reatom/core'
import {ColorId, ColorName, ColorsVariation, createColorId} from '../../../../../../common/colors/colors'
import {CategoryData, editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {createEnumAtom, createPrimitiveAtom, createSetAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../../components/icons/getOutlineIconById'
import {UpdateCategoriesInfoRequest} from '../../../../../api/categories/update_categories_info'
import {verify} from '../../../../../../common/verify'

const titleAtom = createStringAtom('')
const iconIdAtom = createStringAtom<OutlineIconId>('outline-shopping-bag')
const colorIdAtom = createStringAtom<ColorId>('white')
const subcategoriesAtom = createAtom(
	{
		updateSubcategory: (value: CategoryData) => value,
		set: (value: Array<CategoryData>) => value,
	},
	({onAction}, state = [] as Array<CategoryData>) => {
		onAction('set', value => (state = value))
		onAction('updateSubcategory', value => {
			state = state.map(x => (x.id === value.id ? value : x))
		})
		return state
	},
)

const editedSubcategoryIdsSetAtom = createSetAtom<number>()
const removedSubcategoryIdsSetAtom = createSetAtom<number>()
const haveBecomeMainCategoriesIdsSetAtom = createSetAtom<number>()
const newSubcategoriesAtom = createPrimitiveAtom<Array<CategoryData>>([])
const statusesAtom = createEnumAtom(['init', 'saving'])

statusesAtom.subscribe(status => {
	if (status === 'init') {
		return undefined
	}
	const editedSubcategoryIds = editedSubcategoryIdsSetAtom.getState()

	const data: UpdateCategoriesInfoRequest = {
		id: verify(editableCategoryIdAtom.getState()),
		iconId: iconIdAtom.getState(),
		colorId: colorIdAtom.getState(),
		name: titleAtom.getState(),
		editedSubcategories: subcategoriesAtom.getState().filter(x => editedSubcategoryIds.has(x.id)),
		newSubcategories: newSubcategoriesAtom.getState(),
		removedSubcategoryIds: [...removedSubcategoryIdsSetAtom.getState()],
		haveBecomeMainCategoriesIds: [...haveBecomeMainCategoriesIdsSetAtom.getState()],
	}
	console.log(data) //TODO:Сделать апи, куда отправлять данные.
})

function getAvailableColorIds(): Array<ColorId> {
	const colorGroups: Array<ColorName> = [
		'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
		'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
	]
	const colorsSaturation: Array<ColorsVariation> = [
		300, 400, 500, 600, 700,
	]

	return colorGroups.flatMap(group => colorsSaturation.map(x => createColorId(group, x)))
}

export const editCategoryPopupAtoms = {
	titleAtom,
	subcategoriesAtom,
	iconIdAtom,
	colorIdAtom,
	editedSubcategoryIdsSetAtom,
	removedSubcategoryIdsSetAtom,
	newSubcategoriesAtom,
	haveBecomeMainCategoriesIdsSetAtom,
}

export {
	getAvailableColorIds,
}