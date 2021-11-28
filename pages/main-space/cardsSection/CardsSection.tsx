import {DatePicker} from "../../../components/datePicker/DatePicker"

function CardsSection() {
    return (
<div className='w-3/12 bg-green-100'>
    <DatePicker selected={new Date()}/>
</div>)
}

export {
    CardsSection,
}