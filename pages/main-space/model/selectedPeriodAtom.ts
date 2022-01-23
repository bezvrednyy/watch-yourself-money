import {createAtom} from '@reatom/core'
import {endOfMonth, startOfMonth} from 'date-fns'

export type SelectedPeriod = {
	startDate: Date,
	endDate: Date,
}

export const selectedPeriodAtom = createAtom(
	{
		set: (v: SelectedPeriod) => v,
	},
	({onAction}, state = getInitPeriod()) => {
		onAction('set', value => (state = value))
		return state
	},
)

function getInitPeriod(): SelectedPeriod {
	return {
		startDate: startOfMonth(new Date()),
		endDate: endOfMonth(new Date()),
	}
}