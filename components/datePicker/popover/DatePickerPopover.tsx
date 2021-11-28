import {useState} from 'react'
import type {DatepickerType} from '../model/DatePickerData'
import {DatePickerPopoverHeader} from './content/DatePickerPopoverHeader'
import {DateBody} from './content/DateBody'
import {MonthsBody} from './content/MonthsBody'

type DatePickerPopoverProps = {
    selectedDate: Date,
    onSelectedChanged: (date: Date) => void,
    type: DatepickerType,
}

function DatePickerPopover({
    selectedDate,
    onSelectedChanged,
    type: initType,
}: DatePickerPopoverProps) {
    const [newSelectedDate, setNewSelectedDate] = useState(selectedDate)
    const [type, setType] = useState<DatepickerType>(initType)

    const onMonthChanged = (month: number) => {
        setNewSelectedDate(
            new Date(
                newSelectedDate.getFullYear(),
                month,
                newSelectedDate.getDate()
            )
        )
        setType('date')
    }

    return (
<div
    className='bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0'
    style={{ width: "17rem" }}
>
    <DatePickerPopoverHeader
        date={newSelectedDate}
        type={type}
        onDateChange={setNewSelectedDate}
        onTypeChange={setType}
    />
    {type === "date" && <DateBody
        selectedDate={selectedDate}
        newSelectedDate={newSelectedDate}
        onSelectedChanged={onSelectedChanged}
    />}
    {type === "month" && <MonthsBody
        selectedDate={selectedDate}
        newSelectedDate={newSelectedDate}
        onMonthChanged={onMonthChanged}
    />}
</div>)
}

export {
    DatePickerPopover,
}