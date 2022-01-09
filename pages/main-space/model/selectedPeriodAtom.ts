import {createAtom} from '@reatom/core'
import {endOfMonth, startOfMonth} from 'date-fns'

export type SelectedPeriod = {
	startDate: Date,
	endDate: Date,
}

export const selectedPeriodAtom = createAtom(
	{
		setStartDate: (v: Date) => v,
		setEndDate: (v: Date) => v,
	},
	({onAction}, state = getInitPeriod()) => {
		onAction('setStartDate', startDate => (state = {...state, startDate}))
		onAction('setEndDate', endDate => (state = {...state, endDate}))
		return state
	},
)

function getInitPeriod(): SelectedPeriod {
	return {
		startDate: startOfMonth(new Date()),
		endDate: endOfMonth(new Date()),
	}
}