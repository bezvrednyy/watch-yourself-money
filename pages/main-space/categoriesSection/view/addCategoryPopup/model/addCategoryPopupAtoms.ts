import {createAtom} from '@reatom/core'
import {ColorId} from '../../../../../../common/colors/colors'
import {CategoryData} from '../../../../model/categoriesAtom'
import {createEnumAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../../uikit/icons/getOutlineIconById'

const statusesAtom = createEnumAtom(['normal', 'saving'])
const categoryIdAtom = createStringAtom('')
const titleAtom = createStringAtom('')
const iconIdAtom = createStringAtom<OutlineIconId>('outline-shopping-bag')
const colorIdAtom = createStringAtom<ColorId>('green#400')
const subcategoriesAtom = createAtom(
	{
		set: (value: Array<CategoryData>) => value,
		add: (value: CategoryData) => value,
		update: (value: CategoryData) => value,
		remove: (id: string) => id,
	},
	({onAction}, state = [] as Array<CategoryData>) => {
		onAction('set', value => (state = value))
		onAction('add', value => (state = state.concat(value)))
		onAction('update', value => {
			state = state.map(x => (x.id === value.id ? value : x))
		})
		onAction('remove', id => {
			state = state.filter(x => x.id !== id)
		})
		return state
	},
)

export const addCategoryPopupAtoms = {
	statusesAtom,
	categoryIdAtom,
	titleAtom,
	subcategoriesAtom,
	iconIdAtom,
	colorIdAtom,
}