import {createEnumAtom, createPrimitiveAtom} from '@reatom/core/primitives'

const statusesAtom = createEnumAtom(['normal', 'opened', 'saving'])
const nameAtom = createPrimitiveAtom('')
const balanceAtom = createPrimitiveAtom('')
//TODO:cards добавить errorsAtom, подсветку красным и вибрацию.

export const addAccountButtonAtoms = {
	statusesAtom,
	nameAtom,
	balanceAtom,
}