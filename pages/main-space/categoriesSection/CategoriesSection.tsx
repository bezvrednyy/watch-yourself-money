import {useState} from 'react'
import {EditCategoryPopup} from './EditCategoryPopup'
import {getOutlineIconById} from '../../../components/icons/getOutlineIconById'
import {RoundedSquare} from '../../../components/RoundedSquare'
import {Tabs} from '../Tabs'
import {CategoryData} from './model/CategoryData'

interface CategoriesSectionProps {
	categories: Array<CategoryData>,
}

function CategoriesSection({
	categories,
}: CategoriesSectionProps) {
	const [openedCategoryId, setOpenedCategoryId] = useState<number|null>(null)
	return (
		<div className='w-6/12 bg-red-100'>
			<EditCategoryPopup
				show={openedCategoryId !== null}
				categoryId={openedCategoryId}
				onClose={() => setOpenedCategoryId(null)}
				onSave={() => {
					console.log(`Saving category: ${openedCategoryId}`)
					setOpenedCategoryId(null)
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
						onClick={() => setOpenedCategoryId(item.id)}
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