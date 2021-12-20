import {createAtom} from '@reatom/core'
import {verify} from '../../../../../../common/verify'
import {categoriesAtom, CategoryData, editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {createPrimitiveAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../../components/icons/getOutlineIconById'

type EditableCategoryData = CategoryData & {
	subCategories: Array<CategoryData>,
}

export const editableCategoryAtom = createAtom(
	{
		categoriesAtom,
		editableCategoryIdAtom,
	},
	(track, state = {} as EditableCategoryData) => {
		track.onChange('editableCategoryIdAtom', id => {
			if (id === null) {
				state = {} as EditableCategoryData
				return
			}
			const categories = track.get('categoriesAtom')
			const selectedCategory = verify(
				categories.find(x => x.id === id),
				`Unexpected error: category not found`,
			)
			state = {
				...selectedCategory,
				subCategories: categories.filter(x => x.parentCategoryId === selectedCategory.id),
			}
		})
		return state
	},
)

const titleAtom = createStringAtom('')
const subcategoriesAtom = createPrimitiveAtom<Array<CategoryData>>([])
const iconIdAtom = createStringAtom<OutlineIconId>('outline-shopping-bag')
const colorAtom = createStringAtom('') //hex

export const editCategoryPopupAtoms = {
	titleAtom,
	subcategoriesAtom,
	iconIdAtom,
	colorAtom,
}