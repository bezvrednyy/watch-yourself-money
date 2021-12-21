import {useAction, useAtom} from '@reatom/react'
import {Badge} from '../../../../../components/Badge'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {TextField} from '../../../../../components/TextField'
import {CategoryViewPicker} from './view/CategoryViewPicker'

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
			<div>
				{subcategories.map(x => <Badge
					key={x.id}
					label={x.title}
					className='tag'
				/>)}
			</div>
		</>
	)
}

export {
	EditCategoryPopupContent,
}