import {ColorId, ColorName, ColorsVariation, createColorId} from '../../../../../../common/colors/colors'
import {CategoryData, editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {createEnumAtom, createPrimitiveAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../../components/icons/getOutlineIconById'
import {UpdateCategoriesInfoRequest} from '../../../../../api/categories/update_categories_info'
import {verify} from '../../../../../../common/verify'

const titleAtom = createStringAtom('')
const subcategoriesAtom = createPrimitiveAtom<Array<CategoryData>>([])
const iconIdAtom = createStringAtom<OutlineIconId>('outline-shopping-bag')
const colorIdAtom = createStringAtom<ColorId>('white')
const removedSubcategoryIdsAtom = createPrimitiveAtom<Array<string>>([])
const haveBecomeMainCategoriesIdsAtom = createPrimitiveAtom<Array<string>>([])
const newSubcategoriesAtom = createPrimitiveAtom<Array<CategoryData>>([])
const statusesAtom = createEnumAtom(['init', 'saving'])

statusesAtom.subscribe(status => {
	if (status === 'init') {
		return undefined
	}
	const data: UpdateCategoriesInfoRequest = {
		id: verify(editableCategoryIdAtom.getState()),
		iconId: iconIdAtom.getState(),
		colorId: colorIdAtom.getState(),
		name: titleAtom.getState(),
		newSubcategories: newSubcategoriesAtom.getState(),
		removedSubcategoryIds: removedSubcategoryIdsAtom.getState(),
		haveBecomeMainCategoriesIds: haveBecomeMainCategoriesIdsAtom.getState(),
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

function getAvailableIconIds(): Array<OutlineIconId> {
	return [
		'academic-cap',
		'adjustments',
		'annotation',
		'at-symbol',
		'beaker',
		'bell',
		'book-open',
		'bookmark',
		'cake',
		'briefcase',
		'calculator',
		'calendar',
		'camera',
		'cash',
		'chart-bar',
		'chart-pie',
		'chip',
		'clipboard-check',
		'clipboard-copy',
		'clipboard-list',
		'clipboard',
		'clock',
		'cloud',
		'code',
		'cog',
		'collection',
		'color-swatch',
		'cube',
		'credit-card',
		'currency-dollar',
		'database',
		'desktop-computer',
		'device-mobile',
		'emoji-happy',
		'emoji-sad',
		'exclamation-circle',
		'exclamation',
		'finger-print',
		'fire',
		'flag',
		'gift',
		'globe-alt',
		'globe',
		'hand',
		'hashtag',
		'heart',
		'home',
		'identification',
		'key',
		'library',
		'light - bulb',
		'lightning - bolt',
		'link',
		'location-marker',
		'lock-closed',
		'lock-open',
		'mail',
		'map',
	]
}

export const editCategoryPopupAtoms = {
	titleAtom,
	subcategoriesAtom,
	iconIdAtom,
	colorIdAtom,
	removedSubcategoryIds: removedSubcategoryIdsAtom,
	newSubcategories: newSubcategoriesAtom,
	haveBecomeMainCategoriesIds: haveBecomeMainCategoriesIdsAtom,
}

export {
	getAvailableColorIds,
	getAvailableIconIds,
}