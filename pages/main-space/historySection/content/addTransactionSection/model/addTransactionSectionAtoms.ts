import {createAtom} from '@reatom/core'
import {createPrimitiveAtom} from '@reatom/core/primitives'

const selectedCategoryIdAtom = createPrimitiveAtom<string>('')
const sumAtom = createPrimitiveAtom<number>(0)
const selectedBankAccountId = createPrimitiveAtom<string>('')
const selectedSubcategoryIdAtom = createAtom(
	{
		set: (v: string|null) => v,
		selectedCategoryIdAtom,
	},
	(track, state: string|null = null) => {
		track.onAction('set', v => (state = v))
		track.onChange('selectedCategoryIdAtom', () => (state = null))
		return state
	},
)

export const addTransactionSectionAtoms = {
	selectedCategoryIdAtom,
	sumAtom,
	selectedSubcategoryIdAtom,
	selectedBankAccountId,
}