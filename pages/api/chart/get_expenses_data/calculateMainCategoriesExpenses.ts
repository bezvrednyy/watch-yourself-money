import {Prisma} from '@prisma/client'
import {isSubcategory} from '../../../../common/utils/productUtils'
import {verify} from '../../../../common/utils/verify'
import {MainCategoriesExpensesMap, MainCategoryMoneyExpenses} from './index'

type CategoryData = {
	id: string,
	name: string,
	color: string,
	money: Prisma.Decimal,
	parentCategoryId: string|null,
}

type Args = {
	categoryMoneyMap: Map<string, Prisma.Decimal>,
	allCategoriesData: Array<Omit<CategoryData, 'money'>>
}

type ReturnValue = {
	totalAmount: Prisma.Decimal,
	mainExpensesMap: MainCategoriesExpensesMap,
}

export function calculateMainCategoriesExpenses({
	categoryMoneyMap,
	allCategoriesData,
}: Args): ReturnValue {
	let totalAmount = new Prisma.Decimal(0)
	const allCategoriesMap = new Map<string, CategoryData>()
	for (const x of allCategoriesData) {
		const money = categoryMoneyMap.get(x.id) || new Prisma.Decimal(0) //Категории может не быть в списке, если по ней нет транзакций
		allCategoriesMap.set(x.id, { ...x, money })
	}

	const mainCategoriesExpensesMap: MainCategoriesExpensesMap = new Map()
	allCategoriesMap.forEach(category => {
		totalAmount = totalAmount.plus(category.money)

		if (isSubcategory(category)) {
			const mainCategory = verify(allCategoriesMap.get(category.parentCategoryId))

			const mainCategoryData = updateMainCategoryExpenses({
				subcategoryData: category,
				mainCategoryData: mainCategory,
				mainCategoryExpenses: mainCategoriesExpensesMap.get(category.parentCategoryId),
			})
			mainCategoriesExpensesMap.set(mainCategory.id, mainCategoryData)
		}
		else {
			mainCategoriesExpensesMap.set(category.id, {
				...category,
				subcategories: [],
			})
		}
	})

	return {
		totalAmount,
		mainExpensesMap: mainCategoriesExpensesMap,
	}
}


type HandleCategoryData = {
	subcategoryData: CategoryData,
	mainCategoryData: CategoryData,
	mainCategoryExpenses?: MainCategoryMoneyExpenses,
}

function updateMainCategoryExpenses({
	subcategoryData,
	mainCategoryData,
	mainCategoryExpenses,
}: HandleCategoryData): MainCategoryMoneyExpenses {
	if (mainCategoryExpenses) {
		return {
			...mainCategoryExpenses,
			money: Prisma.Decimal.add(mainCategoryExpenses.money, subcategoryData.money),
			subcategories: [
				...mainCategoryExpenses.subcategories,
				{
					id: subcategoryData.id,
					name: subcategoryData.name,
					color: subcategoryData.color,
					money: subcategoryData.money,
				},
			],
		}
	}
	return {
		id: mainCategoryData.id,
		name: mainCategoryData.name,
		color: mainCategoryData.color,
		money: subcategoryData.money, //Так как основной категории нет, её расходы равны расходам единственной подкатегории
		subcategories: [subcategoryData],
	}
}
