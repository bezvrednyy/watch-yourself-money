import {useAction, useAtom} from '@reatom/react'
import {getColorById} from '../../../common/colors/theme'
import {EditCategoryPopup} from './view/editCategoryPopup/EditCategoryPopup'
import {getOutlineIconById} from '../../../components/icons/getOutlineIconById'
import {RoundedSquare} from '../../../components/RoundedSquare'
import {Tabs} from '../Tabs'
import {categoriesAtom, editableCategoryIdAtom} from '../model/categoriesAtom'

function CategoriesSection() {
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetEditableCategoryId = useAction(editableCategoryIdAtom.set)
	const [categories] = useAtom(categoriesAtom)
	return (
		<div className='w-6/12 bg-red-100'>
			<EditCategoryPopup
				show={editableCategoryId !== null}
				onClose={() => handleSetEditableCategoryId(null)}
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
			</div>
		</div>)
}

export {
	CategoriesSection,
}