import {useAction, useAtom} from '@reatom/react'
import {generateUuid} from '../../../../../common/utils/generateRandom'
import {TextField} from '../../../../../commonClient/uikit/textField/TextField'
import {addCategoryPopupAtoms} from './model/addCategoryPopupAtoms'
import {CategoryViewPicker} from '../common/CategoryViewPicker'
import {AddSubcategoryBadge} from '../common/AddSubcategoryBadge'
import {SubcategoryBadge} from './SubcategoryBadge'

function AddCategoryPopupContent() {
	const [title] = useAtom(addCategoryPopupAtoms.titleAtom)
	const [subcategories] = useAtom(addCategoryPopupAtoms.subcategoriesAtom)
	const [parentCategoryColorId] = useAtom(addCategoryPopupAtoms.colorIdAtom)
	const [categoryId] = useAtom(addCategoryPopupAtoms.categoryIdAtom)
	const [selectedIconId] = useAtom(addCategoryPopupAtoms.iconIdAtom)
	const [selectedColorId] = useAtom(addCategoryPopupAtoms.colorIdAtom)

	const handleSetTitle = useAction(addCategoryPopupAtoms.titleAtom.set)
	const handleAddSubcategory = useAction(addCategoryPopupAtoms.subcategoriesAtom.add)
	const handleSetIconId = useAction(addCategoryPopupAtoms.iconIdAtom.set)
	const handleSetColorId = useAction(addCategoryPopupAtoms.colorIdAtom.set)

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
					placeholder='Category name'
					required={true}
				/>
			</div>
			<div className='flex flex-wrap pt-1'>
				{subcategories.map(x => <SubcategoryBadge key={x.id} {...x} />)}
				<AddSubcategoryBadge
					onSave={data => handleAddSubcategory({
						id: generateUuid(),
						parentCategoryId: categoryId,
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
	AddCategoryPopupContent,
}