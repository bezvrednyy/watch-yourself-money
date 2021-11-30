import styles from './CardsSection.module.css'
import {joinClassNames} from '../../../common/joinClassNames'
import {BankCard} from '../../../components/bankCard/BankCard'
import {DatePicker} from '../../../components/datePicker/DatePicker'
import {CalendarIcon} from '@heroicons/react/outline'
import {useState} from 'react'

function CardsSection() {
	const [selectedDate, setSelectedDate] = useState(new Date())
	//TODO
	const cards = ['1', '2', '3', '4', '5', '6']

	return (
		<div className='flex flex-col w-96 bg-green-100'>
			<DatePicker
				date={selectedDate}
				onSelectedChanged={setSelectedDate}
				className='my-4 w-36 self-center'
				inputStyle='string'
				icon={<CalendarIcon className='w-5 h-5 text-gray-600' />}
			/>
			<div className={joinClassNames('flex flex-col space-y-4 overflow-auto items-center', styles['cards-section'])}>
				{cards.map(card => <BankCard key={card} />)}
			</div>
		</div>)
}

export {
	CardsSection,
}