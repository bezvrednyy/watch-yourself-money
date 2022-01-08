import {createAtom} from '@reatom/core'
import {ColorId, ColorName, ColorsVariation, createColorId} from '../../../../../../common/colors/colors'
import {CategoryData} from '../../../model/categoriesAtom'
import {createEnumAtom, createSetAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../../components/icons/getOutlineIconById'

const statusesAtom = createEnumAtom(['init', 'saving'])
const removedSubcategoryIdsSetAtom = createSetAtom<number>()
const editedSubcategoryIdsSetAtom = createSetAtom<number>()
const haveBecomeMainCategoriesIdsSetAtom = createSetAtom<number>()
const newSubcategoriesIdsSetAtom = createSetAtom<number>()

const titleAtom = createStringAtom('')
const iconIdAtom = createStringAtom<OutlineIconId>('outline-shopping-bag')
const colorIdAtom = createStringAtom<ColorId>('white')
const subcategoriesAtom = createAtom(
	{
		newSubcategoriesIdsSetAtom,
		updateSubcategory: (value: CategoryData) => value,
		remove: (id: number) => id,
		turnInMain: (id: number) => id,
		set: (value: Array<CategoryData>) => value,
		add: (value: CategoryData) => value,
	},
	({onAction, onChange, create, schedule, get}, state = [] as Array<CategoryData>) => {
		onAction('set', value => (state = value))
		onAction('updateSubcategory', value => {
			state = state.map(x => (x.id === value.id ? value : x))
			schedule(dispatch => {
				if (!newSubcategoriesIdsSetAtom.getState().has(value.id)) {
					dispatch(editedSubcategoryIdsSetAtom.add(value.id))
				}
				dispatch(removedSubcategoryIdsSetAtom.delete(value.id))
				dispatch(haveBecomeMainCategoriesIdsSetAtom.delete(value.id))
			})
		})
		onAction('remove', id => {
			const newSubcategoriesIdsSet = get('newSubcategoriesIdsSetAtom')
			schedule(dispatch => {
				if (newSubcategoriesIdsSet.has(id)) {
					dispatch(newSubcategoriesIdsSetAtom.delete(id))
					state = state.filter(x => x.id !== id)
				}
				dispatch(removedSubcategoryIdsSetAtom.add(id))
				dispatch(editedSubcategoryIdsSetAtom.delete(id))
				dispatch(haveBecomeMainCategoriesIdsSetAtom.delete(id))
			})
		})
		onAction('turnInMain', id => {
			schedule(dispatch => {
				dispatch(haveBecomeMainCategoriesIdsSetAtom.add(id))
			})
		})
		onAction('add', value => {
			state = state.concat(value)
			schedule(dispatch => {
				dispatch(newSubcategoriesIdsSetAtom.add(value.id))
			})
		})
		return state
	},
)

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
	statusesAtom,
	titleAtom,
	subcategoriesAtom,
	iconIdAtom,
	colorIdAtom,
	editedSubcategoryIdsSetAtom,
	newSubcategoriesIdsSetAtom,
	removedSubcategoryIdsSetAtom,
	haveBecomeMainCategoriesIdsSetAtom,
}

export {
	getAvailableColorIds,
}