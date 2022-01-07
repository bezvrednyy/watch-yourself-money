import {useAction, useAtom} from '@reatom/react'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {TextField} from '../../../../../components/TextField'
import {CategoryViewPicker} from './view/CategoryViewPicker'
import {SubcategoryBadge} from './view/SubcategoryBadge'

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
			<div className='flex flex-wrap'>
				{subcategories.map(x => <SubcategoryBadge
					key={x.id}
					title={x.title}
					iconId={x.iconId}
				/>)}
			</div>
		</>
	)
}

export {
	EditCategoryPopupContent,
}