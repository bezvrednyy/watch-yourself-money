import {useAction, useAtom} from '@reatom/react'
import {Badge} from '../../../../../components/Badge'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {TextField} from '../../../../../components/TextField'
import {CategoryViewPicker} from './view/CategoryViewPicker'
import {getOutlineIconById} from '../../../../../components/icons/getOutlineIconById'

function EditCategoryPopupContent() {
	const [title] = useAtom(editCategoryPopupAtoms.titleAtom)
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)

	return (
		<>
			<div className='flex space-x-3 items-center'>
				<CategoryViewPicker/>
				<TextField
					value={title}
					onInput={handleSetTitle}
					placeholder={'Category name'}
					required={true}
				/>
			</div>
			<div className='flex'>
				{subcategories.map(x => <Badge
					key={x.id}
					label={x.title}
					className='bg-purple-300 rounded-full'
					createIcon={() => {
						const IconFC = getOutlineIconById(x.iconId)
						return <IconFC className='w-5 h-5' />
					}}
					onClick={() => console.log('Open popup or popover')}
				/>)}
			</div>
		</>
	)
}

export {
	EditCategoryPopupContent,
}