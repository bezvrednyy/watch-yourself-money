import {CategoryData} from '../../../model/categoriesAtom'
import {createPrimitiveAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../../components/icons/getOutlineIconById'

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