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
	return (
		<div className='w-6/12 bg-red-100'>
			<Tabs items={['Расходы', 'Доходы']}/>
			<div className='flex py-10 px-32'>
				{categories.map(item => {
					const Icon = getOutlineIconById(item.iconId)
					return <RoundedSquare
						key={item.id}
						icon={<Icon className='w-8 h-8 overflow-hidden'/>}
						title={item.title}
						onClick={ () => console.log(`Open "${item.title}" category popover`) }
						bgHexColor={item.hexColor}
					/>
				})}
			</div>
		</div>)
}

export {
	CategoriesSection,
}