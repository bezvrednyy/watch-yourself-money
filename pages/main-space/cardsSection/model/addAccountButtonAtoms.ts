import {createEnumAtom} from '@reatom/core/primitives'

const statusesAtom = createEnumAtom(['normal', 'opened', 'saving'])
//TODO:cards добавить errorsAtom, подсветку красным и вибрацию.

export const addAccountButtonAtoms = {
	statusesAtom,
}