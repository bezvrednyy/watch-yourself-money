import {MainLayout} from '../../components/MainLayout'
import {Tabs} from './Tabs'

export default function Index() {
	return <MainLayout title={'Home page'}>
		<Tabs items={['Расходы', 'Доходы']}/>
		<h1>Content</h1>
	</MainLayout>
}