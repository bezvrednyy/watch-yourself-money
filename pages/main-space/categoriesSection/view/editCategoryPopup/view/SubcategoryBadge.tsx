import {useAction} from '@reatom/react'
import {getColorById} from '../../../../../../common/colors/theme'
import {joinClassNames} from '../../../../../../common/joinClassNames'
import {Badge} from '../../../../../../components/Badge'
import {ButtonWithPopover} from '../../../../../../components/button/buttons/buttonWithPopover/ButtonWithPopover'
import {
	getDefaultIconIds,
	getOutlineIconById,
} from '../../../../../../components/icons/getOutlineIconById'
import {PopoverDefault} from '../../../../../../components/popovers/PopoverDefault'
import {RoundedSquare} from '../../../../../../components/RoundedSquare'
import {TextField} from '../../../../../../components/TextField'
import {CategoryData} from '../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from '../model/editableCategoryAtom'
import styles from './SubcategoryBadge.module.css'

export function SubcategoryBadge(props: CategoryData) {
	return <ButtonWithPopover
		createButton={() => <Badge
			label={props.title}
			className={joinClassNames(
				'bg-purple-300 rounded-full mr-1 mt-2',
				styles.badge,
			)}
			createIcon={() => {
				const IconFC = getOutlineIconById(props.iconId)
				return <IconFC className='w-5 h-5' />
			}}
			onClick={() => console.log('Open popup or popover')}
			cornerType='rounded'
		/>}
		createPopover={() => <PopoverDefault
			createContent={() => <PopoverContent {...props} />}
		/>}
	/>
}

function PopoverContent(categoryData: CategoryData) {
	const {id: subcategoryId, iconId, title} = categoryData
	const handleUpdateSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.updateSubcategory)
	const handleAddEditedSubcategoryId = useAction(editCategoryPopupAtoms.editedSubcategoryIdsSetAtom.add)
	return (
		<div className='w-44'>
			<TextField
				value={title}
				onInput={value => {
					handleUpdateSubcategory({
						...categoryData,
						title: value,
					})
					handleAddEditedSubcategoryId(subcategoryId)
				}}
				placeholder={'Category name'}
				required={true}
			/>
			<div className='flex justify-between flex-wrap max-h-64 overflow-y-scroll pt-1 pr-1 relative left-1 scrollbar'>
				{getDefaultIconIds().map(id => <RoundedSquare
					key={id}
					bgHexColor={getColorById('white')}
					className={joinClassNames(
						'transform transition hover:scale-105 cursor-pointer w-7 h-7 mb-1',
						iconId === id ? 'border-2 border-purple-600 rounded-full' : null,
					)}
					rounded='full'
					createIcon={() => {
						const IconFC = getOutlineIconById(id)
						return <IconFC className='w-6 h-6 text-black shadow-none' />
					}}
					onClick={() => {
						handleUpdateSubcategory({
							...categoryData,
							iconId: id,
						})
						handleAddEditedSubcategoryId(subcategoryId)
					}}
				/>)}
			</div>
		</div>
	)
}