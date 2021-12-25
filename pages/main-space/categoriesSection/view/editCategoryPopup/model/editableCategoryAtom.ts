import {ColorId, ColorName, ColorsVariation, createColorId} from '../../../../../../common/colors/colors'
import {CategoryData} from '../../../model/categoriesAtom'
import {createPrimitiveAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../../components/icons/getOutlineIconById'

const titleAtom = createStringAtom('')
const subcategoriesAtom = createPrimitiveAtom<Array<CategoryData>>([])
const iconIdAtom = createStringAtom<OutlineIconId>('outline-shopping-bag')
const colorAtom = createStringAtom('') //hex

function getAvailableColorIds(): Array<ColorId> {
	const colorGroups: Array<ColorName> = [
		'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
		'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
	]
	const colorsSaturation: Array<ColorsVariation> = [
		100, 200, 300, 400, 500, 600, 700, 800, 900,
	]

	return colorGroups.flatMap(group => colorsSaturation.map(x => createColorId(group, x)))
}

export const editCategoryPopupAtoms = {
	titleAtom,
	subcategoriesAtom,
	iconIdAtom,
	colorAtom,
}

export {
	getAvailableColorIds,
}