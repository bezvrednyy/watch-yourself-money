import {useAction, useAtom} from '@reatom/react'
import {getColorById} from '../../../../../../common/colors/theme'
import {verify} from '../../../../../../common/verify'
import {
	ButtonWithPopover,
	PopoverContentProps,
} from '../../../../../../components/button/buttons/buttonWithPopover/ButtonWithPopover'
import {getOutlineIconById} from '../../../../../../components/icons/getOutlineIconById'
import {PopoverDefault} from '../../../../../../components/popovers/PopoverDefault'
import {RoundedSquare} from '../../../../../../components/RoundedSquare'
import {categoriesAtom} from '../../../../model/categoriesAtom'
import {addTransactionSectionAtoms} from '../model/addTransactionSectionAtoms'

export function CategoryPicker() {
	const [selectedCategoryId] = useAtom(addTransactionSectionAtoms.selectedCategoryIdAtom)
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
		className='mr-4'
	/>
}

function PopoverContent({
	closeFn,
}: PopoverContentProps) {
	const [categories] = useAtom(categoriesAtom)
	const handleSetSelectCategoryId = useAction(addTransactionSectionAtoms.selectedCategoryIdAtom.set)

	return (
		<div className='flex flex-wrap'>
			{categories.mainCategories.map(item => {
				const Icon = getOutlineIconById(item.iconId)
				return <RoundedSquare
					key={item.id}
					createIcon={() => <Icon className='m-1 w-6 h-6 overflow-hidden'/>}
					title={item.title}
					onClick={() => {
						handleSetSelectCategoryId(item.id)
						closeFn()
					}}
					bgHexColor={getColorById(item.colorId)}
					className='m-1 opacity-90 transform transition hover:scale-105 cursor-pointer hover:opacity-100 shadow'
				/>
			})}
		</div>
	)
}