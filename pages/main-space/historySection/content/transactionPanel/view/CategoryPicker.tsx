import {useAction, useAtom} from '@reatom/react'
import {getColorById} from '../../../../../../common/colors/theme'
import {verify} from '../../../../../../common/utils/verify'
import {
	ButtonWithPopover,
	PopoverContentProps,
} from '../../../../../../commonClient/uikit/button/buttons/buttonWithPopover/ButtonWithPopover'
import {getOutlineIconById} from '../../../../../../commonClient/uikit/icons/getOutlineIconById'
import {PopoverDefault} from '../../../../../../commonClient/uikit/popovers/PopoverDefault'
import {RoundedSquare} from '../../../../../../commonClient/uikit/RoundedSquare'
import {categoriesAtom} from '../../../../model/categoriesAtom'
import {transactionPanelAtoms} from '../model/transactionPanelAtoms'

export function CategoryPicker() {
	const [selectedCategoryId] = useAtom(transactionPanelAtoms.selectedCategoryIdAtom)
	const [categories] = useAtom(categoriesAtom)
	const selectedCategory = verify(categories.mainCategories.find(x => x.id === selectedCategoryId))
	const IconFC = getOutlineIconById(selectedCategory.iconId)

	return <ButtonWithPopover
		createButton={() => <RoundedSquare
			createIcon={() => <IconFC className='m-1 w-6 h-6 overflow-hidden' />}
			bgHexColor={getColorById(selectedCategory.colorId)}
			className='transform transition hover:scale-105 cursor-pointer shadow'
		/>}
		createPopover={props => <PopoverDefault
			createContent={() => <PopoverContent {...props}/>}
		/>}
	/>
}

function PopoverContent({
	closeFn,
}: PopoverContentProps) {
	const [categories] = useAtom(categoriesAtom)
	const handleSetSelectedCategoryId = useAction(transactionPanelAtoms.selectedCategoryIdAtom.set)
	const handleSetSelectedSubcategoryId = useAction(transactionPanelAtoms.selectedSubcategoryIdAtom.set)

	return (
		<div className='flex flex-wrap'>
			{categories.mainCategories.map(item => {
				const Icon = getOutlineIconById(item.iconId)
				return <RoundedSquare
					key={item.id}
					createIcon={() => <Icon className='m-1 w-6 h-6 overflow-hidden'/>}
					title={item.title}
					onClick={() => {
						handleSetSelectedCategoryId(item.id)
						handleSetSelectedSubcategoryId(null)
						closeFn()
					}}
					bgHexColor={getColorById(item.colorId)}
					className='m-1 opacity-90 transform transition hover:scale-105 cursor-pointer hover:opacity-100 shadow'
				/>
			})}
		</div>
	)
}