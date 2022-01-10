import {PlusSmIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {useState} from 'react'
import {getColorById} from '../../../common/colors/theme'
import {AddCategoryPopup} from './view/addCategoryPopup/AddCategoryPopup'
import {EditCategoryPopup} from './view/editCategoryPopup/EditCategoryPopup'
import {getOutlineIconById} from '../../../uikit/icons/getOutlineIconById'
import {RoundedSquare} from '../../../uikit/RoundedSquare'
import {Tabs} from '../Tabs'
import {categoriesAtom, editableCategoryIdAtom} from '../model/categoriesAtom'

function CategoriesSection() {
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const [categories] = useAtom(categoriesAtom)
	const handleSetEditableCategoryId = useAction(editableCategoryIdAtom.set)
	const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false)

	return (
		<div className='w-6/12 bg-red-100'>
			<EditCategoryPopup
				show={editableCategoryId !== null}
				onClose={() => handleSetEditableCategoryId(null)}
			/>
			<AddCategoryPopup
				show={showAddCategoryPopup}
				onClose={() => setShowAddCategoryPopup(false)}
			/>
			<Tabs items={['Расходы']}/>
			<div className='flex flex-wrap py-10 px-32'>
				{categories.mainCategories.map(item => {
					const Icon = getOutlineIconById(item.iconId)
					return <RoundedSquare
						key={item.id}
						createIcon={() => <Icon className='m-2 w-8 h-8 overflow-hidden'/>}
						title={item.title}
						onClick={() => handleSetEditableCategoryId(item.id)}
						bgHexColor={getColorById(item.colorId)}
						className='mx-2.5 my-2.5 opacity-90 transform transition hover:scale-105 cursor-pointer hover:opacity-100 shadow'
					/>
				})}
				<RoundedSquare
					key='add-category-button'
					createIcon={() => <PlusSmIcon className='m-2 w-8 h-8 overflow-hidden'/>}
					title='Add category'
					onClick={() => setShowAddCategoryPopup(true)}
					bgHexColor={getColorById('white')}
					className='mx-2.5 my-2.5 opacity-90 transform transition hover:scale-105 cursor-pointer hover:opacity-100 shadow'
				/>
			</div>
		</div>)
}

export {
	CategoriesSection,
}