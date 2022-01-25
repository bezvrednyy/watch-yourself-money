import {PlusSmIcon} from '@heroicons/react/solid'
import {useAction, useAtom} from '@reatom/react'
import {useState} from 'react'
import {getColorById} from '../../../common/colors/theme'
import {AddCategoryPopup} from './view/addCategoryPopup/AddCategoryPopup'
import {EditCategoryPopup} from './view/editCategoryPopup/EditCategoryPopup'
import {getOutlineIconById} from '../../../commonClient/uikit/icons/getOutlineIconById'
import {RoundedSquare} from '../../../commonClient/uikit/RoundedSquare'
import {categoriesAtom, editableCategoryIdAtom} from '../model/categoriesAtom'
import {TransactionsChart} from './view/transactionsChart/TransactionsChart'

function CategoriesSection() {
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const [categories] = useAtom(categoriesAtom)
	const handleSetEditableCategoryId = useAction(editableCategoryIdAtom.set)
	const [showAddCategoryPopup, setShowAddCategoryPopup] = useState(false)

	//TODO:improvements Добавить ещё один chart
	return (
		<div className='flex flex-col w-[600px] shrink-0 bg-white'>
			<EditCategoryPopup
				show={editableCategoryId !== null}
				onClose={() => handleSetEditableCategoryId(null)}
			/>
			<AddCategoryPopup
				show={showAddCategoryPopup}
				onClose={() => setShowAddCategoryPopup(false)}
			/>
			<div className='flex flex-wrap pt-20 mb-auto px-[62px]'>
				{categories.mainCategories.map(item => {
					const Icon = getOutlineIconById(item.iconId)
					return <RoundedSquare
						key={item.id}
						createIcon={() => <Icon className='m-2 w-full h-full overflow-hidden'/>}
						title={item.title}
						onClick={() => handleSetEditableCategoryId(item.id)}
						bgHexColor={getColorById(item.colorId)}
						className='mx-2.5 my-2.5 opacity-90 w-12 h-12 transform transition hover:scale-105 cursor-pointer hover:opacity-100 shadow'
					/>
				})}
				<RoundedSquare
					key='add-category-button'
					createIcon={() => <PlusSmIcon className='m-2 w-full h-full overflow-hidden'/>}
					title='Add category'
					onClick={() => setShowAddCategoryPopup(true)}
					bgHexColor={getColorById('white')}
					className='mx-2.5 my-2.5 w-12 h-12 opacity-90 transform transition hover:scale-105 cursor-pointer hover:opacity-100 shadow'
				/>
			</div>
			<div className='relative w-[340px] self-center mb-20'>
				<TransactionsChart />
			</div>
		</div>)
}

export {
	CategoriesSection,
}