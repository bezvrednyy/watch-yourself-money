import {createAtom} from '@reatom/core'
import {ColorId} from '../../../../../../common/colors/colors'
import {ClientCategoryData} from '../../../../model/categoriesAtom'
import {createEnumAtom, createPrimitiveAtom, createStringAtom} from '@reatom/core/primitives'
import {OutlineIconId} from '../../../../../common/uikit/icons/getOutlineIconById'

export type SubcategoryChangeType = 'default'|'removed'|'turnToMain'|'new'|'edited'

export type EditCategoryPopupSubcategoryData = ClientCategoryData & {
	changeType: SubcategoryChangeType,
}

type EditCategoryPopupExternalHandlers = {
	onClose: () => void,
}

const statusesAtom = createEnumAtom(['normal', 'saving'])
const openedNotificationPopupAtom = createEnumAtom(['closed', 'removeCategory', 'removeSubcategory'])
const externalHandlersAtom = createPrimitiveAtom<EditCategoryPopupExternalHandlers>({} as EditCategoryPopupExternalHandlers)

const titleAtom = createStringAtom('')
const iconIdAtom = createStringAtom<OutlineIconId>('outline-shopping-bag')
const colorIdAtom = createStringAtom<ColorId>('green#500')
const subcategoriesAtom = createAtom(
	{
		updateSubcategory: (value: EditCategoryPopupSubcategoryData) => value,
		remove: (id: string) => id,
		turnToMain: (id: string) => id,
		set: (value: Array<ClientCategoryData>) => value.map(x => ({ ...x, changeType: 'default'}) as EditCategoryPopupSubcategoryData),
		add: (value: EditCategoryPopupSubcategoryData) => value,
	},
	({ onAction }, state = [] as Array<EditCategoryPopupSubcategoryData>) => {
		onAction('set', value => (state = value))
		onAction('updateSubcategory', value => (state = state.map(
			x => (x.id === value.id
				? {...value, changeType: value.changeType === 'new' ? 'new' : 'edited'}
				: x))
		))
		onAction('remove', id => (state = state.map(
			x => (x.id === id ? { ...x, changeType: 'removed' } : x),
		)))
		onAction('turnToMain', id => (state = state.map(
			x => (x.id === id ? { ...x, changeType: 'turnToMain' } : x),
		)))
		onAction('add', value => {
			state = state.concat(value)
		})
		return state
	},
)

export const editCategoryPopupAtoms = {
	statusesAtom,
	externalHandlersAtom,
	titleAtom,
	subcategoriesAtom,
	iconIdAtom,
	colorIdAtom,
	openedNotificationPopupAtom,
}