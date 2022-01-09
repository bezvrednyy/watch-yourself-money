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
		onAction('setStartDate', startDate => (state = {
			...state,
			startDate,
			endDate: startDate > state.endDate
				? startDate
				: state.endDate,
		}))
		onAction('setEndDate', endDate => (state = {
			...state,
			endDate,
			startDate: endDate < state.startDate
				? endDate
				: state.startDate,
		}))
		return state
	},
)

function getInitPeriod(): SelectedPeriod {
	return {
		startDate: startOfMonth(new Date()),
		endDate: endOfMonth(new Date()),
	}
}