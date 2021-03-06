import {createEnumAtom, createPrimitiveAtom} from '@reatom/core/primitives'

const statusesAtom = createEnumAtom(['normal', 'removing'])
const removableBankAccountIdAtom = createPrimitiveAtom<string|null>(null)
const movingTransactionsAccountIdAtom = createPrimitiveAtom<string|null>(null)

export const removeBankAccountPopupAtoms = {
	statusesAtom,
	removableBankAccountIdAtom,
	movingTransactionsAccountIdAtom,
}