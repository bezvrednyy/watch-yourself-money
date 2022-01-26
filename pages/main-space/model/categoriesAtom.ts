import {createPrimitiveAtom} from '@reatom/core/primitives'
import {getClientApi, processStandardError} from '../../../backFrontJoint/clientApi/clientApi'
import {ColorId} from '../../../common/colors/colors'
import {devideArray} from '../../../common/utils/array'
import {declareAloneAction} from '../../../commonClient/declareAloneAction'
import {OutlineIconId} from '../../../commonClient/uikit/icons/getOutlineIconById'

type CategoryType = 'EXPENSES'|'INCOMES'

export type ClientCategoryData = {
	id: string,
	parentCategoryId?: string,
	title: string,
	type: CategoryType,
	iconId: OutlineIconId,
	colorId: ColorId,
}

export type MainCategoryData = ClientCategoryData & {
	parentCategoryId: undefined,
}

export type SubCategoryData = ClientCategoryData & {
	parentCategoryId: string,
}

type CategoriesAtomData = {
	mainCategories: Array<MainCategoryData>,
	subCategories: Array<SubCategoryData>,
}

export const categoriesAtom = createPrimitiveAtom<CategoriesAtomData>({
	mainCategories: [],
	subCategories: [],
})
export const editableCategoryIdAtom = createPrimitiveAtom<null|string>(null)

//TODO:improvements мб сделать единый экшн обновления данных: категорий, транзакций, счетов?
export const updateCategoriesAction = declareAloneAction(async store => {
	const either = await getClientApi().categories.getCategories()
	either
		.mapRight(categories => {
			const [mainCategories, subCategories] = devideArray(categories, x => x.parentCategoryId === undefined)
			store.dispatch(categoriesAtom.set({
				mainCategories: mainCategories as Array<MainCategoryData>,
				subCategories: subCategories as Array<SubCategoryData>,
			}))
		})
		.mapLeft(processStandardError)

})