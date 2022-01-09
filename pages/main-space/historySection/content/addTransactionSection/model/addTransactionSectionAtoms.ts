import {createPrimitiveAtom} from '@reatom/core/primitives'

const selectedCategoryIdAtom = createPrimitiveAtom<string>('')
const sumAtom = createPrimitiveAtom<number>(0)
const selectedSubcategoryIdAtom = createPrimitiveAtom<string|null>(null)

export const addTransactionSectionAtoms = {
	selectedCategoryIdAtom,
	sumAtom,
	selectedSubcategoryIdAtom,
}