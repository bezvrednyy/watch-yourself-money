import {Tabs} from '../Tabs'

function CategoriesSection() {
	return (
		<div className='w-6/12 bg-red-100'>
			<Tabs items={['Расходы', 'Доходы']}/>
		</div>)
}

export {
	CategoriesSection,
}