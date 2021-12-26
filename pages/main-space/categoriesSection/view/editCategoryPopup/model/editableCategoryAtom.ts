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
		'outline-academic-cap',
		'outline-annotation',
		'outline-beaker',
		'outline-bell',
		'outline-book-open',
		'outline-bookmark',
		'outline-cake',
		'outline-briefcase',
		'outline-calculator',
		'outline-calendar',
		'outline-camera',
		'outline-cash',
		'outline-chart-bar',
		'outline-chart-pie',
		'outline-chip',
		'outline-clipboard-list',
		'outline-clipboard',
		'outline-clock',
		'outline-cloud',
		'outline-code',
		'outline-cog',
		'outline-cube',
		'outline-credit-card',
		'outline-currency-dollar',
		'outline-database',
		'outline-desktop-computer',
		'outline-device-mobile',
		'outline-emoji-happy',
		'outline-emoji-sad',
		'outline-exclamation-circle',
		'outline-exclamation',
		'outline-finger-print',
		'outline-fire',
		'outline-flag',
		'outline-gift',
		'outline-globe-alt',
		'outline-globe',
		'outline-hand',
		'outline-hashtag',
		'outline-heart',
		'outline-home',
		'outline-identification',
		'outline-key',
		'outline-library',
		'outline-light-bulb',
		'outline-lightning-bolt',
		'outline-link',
		'outline-location-marker',
		'outline-lock-closed',
		'outline-lock-open',
		'outline-mail',
		'outline-map',
		'outline-microphone',
		'outline-moon',
		'outline-music-note',
		'outline-office-building',
		'outline-paper-clip',
		'outline-pause',
		'outline-phone',
		'outline-photograph',
		'outline-play',
		'outline-printer',
		'outline-puzzle',
		'outline-share',
		'outline-shopping-bag',
		'outline-shopping-cart',
		'outline-speakerphone',
		'outline-star',
		'outline-sun',
		'outline-translate',
		'outline-trash',
		'outline-truck',
		'outline-user-group',
		'outline-users',
		'outline-volume-up',
		'outline-wifi',
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