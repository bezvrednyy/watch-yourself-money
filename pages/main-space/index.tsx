import {DatePicker} from '../../components/datePicker/DatePicker'
import {MainLayout} from '../../components/MainLayout'
import {Tabs} from './Tabs'

export default function Index() {
	return <MainLayout title={'Home page'}>
		<Tabs items={['Расходы', 'Доходы']}/>
		<DatePicker selected={new Date()}/>
	</MainLayout>
}