import {useAction, useAtom} from '@reatom/react'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {TextFieldDefault} from '../../../../../components/textField/TextFieldDefault'
import {CategoryViewPicker} from './view/CategoryViewPicker'
import {AddSubcategoryBadge} from './view/subcategoryBadge/AddSubcategoryBadge'
import {SubcategoryBadge} from './view/subcategoryBadge/SubcategoryBadge'

function EditCategoryPopupContent() {
	const [title] = useAtom(editCategoryPopupAtoms.titleAtom)
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)

	return (
		<>
			<div className='flex space-x-3 items-center'>
				<CategoryViewPicker/>
				<TextFieldDefault
					value={title}
					onInput={handleSetTitle}
					placeholder={'Category name'}
					required={true}
				/>
			</div>
			<div className='flex flex-wrap pt-1'>
				{subcategories.map(x => <SubcategoryBadge
					key={x.id}
					{...x}
				/>)}
				<AddSubcategoryBadge />
			</div>
		</>
	)
}

export {
	EditCategoryPopupContent,
}