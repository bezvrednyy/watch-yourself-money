import {useAction, useAtom} from '@reatom/react'
import {generateUuid} from '../../../../../common/generateRandom'
import {verify} from '../../../../../common/verify'
import {TextField} from '../../../../../components/textField/TextField'
import {editableCategoryIdAtom} from '../../../model/categoriesAtom'
import {AddSubcategoryBadge} from '../common/AddSubcategoryBadge'
import {CategoryViewPicker} from '../common/CategoryViewPicker'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {SubcategoryBadge} from './view/subcategoryBadge/SubcategoryBadge'

function EditCategoryPopupContent() {
	const [title] = useAtom(editCategoryPopupAtoms.titleAtom)
	const [subcategories] = useAtom(editCategoryPopupAtoms.subcategoriesAtom)
	const [selectedIconId] = useAtom(editCategoryPopupAtoms.iconIdAtom)
	const [selectedColorId] = useAtom(editCategoryPopupAtoms.colorIdAtom)
	const [parentCategoryColorId] = useAtom(editCategoryPopupAtoms.colorIdAtom)
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)
	const handleAddSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.add)
	const handleSetIconId = useAction(editCategoryPopupAtoms.iconIdAtom.set)
	const handleSetColorId = useAction(editCategoryPopupAtoms.colorIdAtom.set)

	return (
		<>
			<div className='flex space-x-3 items-center'>
				<CategoryViewPicker
					iconId={selectedIconId}
					colorId={selectedColorId}
					onSelectIcon={handleSetIconId}
					onSelectColor={handleSetColorId}
				/>
				<TextField
					style='default'
					value={title}
					onInput={handleSetTitle}
					placeholder={'Category name'}
					required={true}
				/>
			</div>
			<div className='flex flex-wrap pt-1'>
				{subcategories.map(x => <SubcategoryBadge key={x.id} {...x} />)}
				<AddSubcategoryBadge
					onSave={data => handleAddSubcategory({
						id: generateUuid(),
						parentCategoryId: verify(editableCategoryId),
						title: data.title,
						type: 'EXPENSES',
						iconId: data.iconId,
						colorId: parentCategoryColorId,
					})}
				/>
			</div>
		</>
	)
}

export {
	EditCategoryPopupContent,
}