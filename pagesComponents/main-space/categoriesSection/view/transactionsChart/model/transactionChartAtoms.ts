import {createAtom} from '@reatom/core'
import {MainCategoryPercentExpenses} from '../../../../../../backFrontJoint/common/contracts/chart/getExpensesDataContract'

type TransactionChartExpenses = {
	totalAmount: number,
	mainCategoriesExpenses: Array<MainCategoryPercentExpenses>,
}

function getInitExpenses(): TransactionChartExpenses {
	return {
		totalAmount: 0,
		mainCategoriesExpenses: [],
	}
}

const categoriesExpensesAtom = createAtom(
	{
		set: (v: TransactionChartExpenses) => v,
	},
	({ onAction }, state = getInitExpenses()) => {
		onAction('set', value => (state = value))
		return state
	},
)

export const transactionChartAtoms = {
	categoriesExpensesAtom,
}