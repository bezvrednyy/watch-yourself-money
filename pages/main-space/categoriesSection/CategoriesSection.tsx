import {useAtom, useAction} from '@reatom/react'
import {EditCategoryPopup} from './view/editCategoryPopup/EditCategoryPopup'
import {getOutlineIconById} from '../../../components/icons/getOutlineIconById'
import {RoundedSquare} from '../../../components/RoundedSquare'
import {Tabs} from '../Tabs'
import {categoriesAtom, editableCategoryIdAtom} from './model/categoriesAtom'

function CategoriesSection() {
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetEditableCategoryId = useAction(editableCategoryIdAtom.set)
	const [categories] = useAtom(categoriesAtom)
	return (
		<div className='w-6/12 bg-red-100'>
			<EditCategoryPopup
				show={editableCategoryId !== null}
				onClose={() => handleSetEditableCategoryId(null)}
				onSave={() => {
					console.log(`Saving category: ${editableCategoryId}`)
					handleSetEditableCategoryId(null)
				}}
			/>
			<Tabs items={['Расходы', 'Доходы']}/>
			<div className='flex flex-wrap py-10 px-32'>
				{categories.map(item => {
					const Icon = getOutlineIconById(item.iconId)
					return <RoundedSquare
						key={item.id}
						icon={<Icon className='w-8 h-8 overflow-hidden'/>}
						title={item.title}
						onClick={() => handleSetEditableCategoryId(item.id)}
						bgHexColor={item.hexColor}
						className='mx-2.5 my-2.5'
					/>
				})}
			</div>
		</div>)
}

export {
	CategoriesSection,
}