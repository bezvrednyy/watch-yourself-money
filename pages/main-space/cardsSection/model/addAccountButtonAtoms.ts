import {createAtom} from '@reatom/core'
import {createEnumAtom} from '@reatom/core/primitives'

type ErrorType = 'invalidName'|'invalidBalance'

const statusesAtom = createEnumAtom(['normal', 'opened', 'saving'])
const errorsSetAtom = createAtom(
	{
		addError: (v: ErrorType) => v,
		removeError: (v: ErrorType) => v,
		clear: () => {},
	},
	({ onAction } , state: Set<ErrorType> = new Set() ) => {
		onAction('addError', v => (state = new Set([...state, v])))
		onAction('removeError', v => (state = new Set([...state].filter(x => x !== v))))
		onAction('clear', () => (state = new Set()))
		return state
	},
)
//TODO:cards добавить errorsAtom, подсветку красным и вибрацию.

export const addAccountButtonAtoms = {
	statusesAtom,
	errorsSetAtom,
}