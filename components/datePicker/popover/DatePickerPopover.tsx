import {useState} from 'react'
import {format, isEqual} from 'date-fns'
import type {DatepickerType} from '../model/DatePickerData'
import {DatePickerPopoverHeader} from './content/DatePickerPopoverHeader'
import {DateBody} from './content/DateBody'

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

    const isSelectedMonth = (month: number) =>
        isEqual(
            new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
            selectedDate
        )

    const setMonthValue = (month: number) => () => {
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
    {type === "month" && (
        <div className="flex flex-wrap -mx-1">
            {Array(12)
                .fill(null)
                .map((_, i) => (
                    <div
                        key={i}
                        onClick={setMonthValue(i)}
                        style={{ width: "25%" }}
                    >
                        <div
                            className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
                                isSelectedMonth(i)
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-blue-200"
                            }`}
                        >
                            {format(
                                new Date(
                                    newSelectedDate.getFullYear(),
                                    i,
                                    newSelectedDate.getDate()
                                ),
                                "MMM"
                            )}
                        </div>
                    </div>
                ))}
        </div>
    )}{" "}
</div>)
}

export {
    DatePickerPopover,
}