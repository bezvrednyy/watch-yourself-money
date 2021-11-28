import {DatePicker} from '../../../components/datePicker/DatePicker'
import {CalendarIcon} from '@heroicons/react/outline'
import {useState} from 'react'

function CardsSection() {
	const [selectedDate, setSelectedDate] = useState(new Date())

	return (
		<div className='flex justify-center w-3/12 bg-green-100'>
			<DatePicker
				date={selectedDate}
				onSelectedChanged={setSelectedDate}
				className='m-2 w-36'
				inputStyle='string'
				icon={<CalendarIcon className='w-5 h-5 text-gray-600' />}
			/>
		</div>)
}

export {
	CardsSection,
}