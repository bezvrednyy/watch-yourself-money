import {DatePicker} from "../../../components/datePicker/DatePicker"
import {CalendarIcon} from '@heroicons/react/outline'

function CardsSection() {
    return (
<div className='w-3/12 bg-green-100'>
    <DatePicker
        selected={new Date()}
        className='m-2 w-36'
        inputStyle='string'
        icon={<CalendarIcon className='w-5 h-5 text-gray-600' />}
    />
</div>)
}

export {
    CardsSection,
}