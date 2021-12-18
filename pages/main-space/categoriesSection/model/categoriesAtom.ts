import {createAtom} from '@reatom/core'
import {OutlineIconId} from '../../../../components/icons/getOutlineIconById'

type CategoryType = 'EXPENSES'|'INCOMES'

export type CategoryData = {
	id: number,
	parentCategoryId?: number,
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	hexColor: string,
}

export const categoriesAtom = createAtom(
	{
		set: (categories: Array<CategoryData>) => categories,
	},
	(track, state: Array<CategoryData> = []) => {
		track.onAction('set', categories => (state = categories))
		return state
	},
)