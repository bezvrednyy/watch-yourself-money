import {useEffect, useState} from 'react'
import {format, getDay, getDaysInMonth, isEqual} from 'date-fns'
import type {DatepickerType} from '../model/DatePickerData'
import {DatePickerPopoverHeader} from './DatePickerPopoverHeader'

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
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const [dayCount, setDayCount] = useState<Array<number>>([])
    const [blankDays, setBlankDays] = useState<Array<number>>([])
    const [datepickerHeaderDate, setDatepickerHeaderDate] = useState(selectedDate)
    const [type, setType] = useState<DatepickerType>(initType)

    const isToday = (date: number) =>
        isEqual(
            new Date(selectedDate.getFullYear(), selectedDate.getMonth(), date),
            selectedDate
        )

    const setDateValue = (day: number) => () => {
        const newDate = new Date(
            datepickerHeaderDate.getFullYear(),
            datepickerHeaderDate.getMonth(),
            day,
        )
        onSelectedChanged(newDate)
    }

    const isSelectedMonth = (month: number) =>
        isEqual(
            new Date(selectedDate.getFullYear(), month, selectedDate.getDate()),
            selectedDate
        );

    const setMonthValue = (month: number) => () => {
        setDatepickerHeaderDate(
            new Date(
                datepickerHeaderDate.getFullYear(),
                month,
                datepickerHeaderDate.getDate()
            )
        );
        setType('date')
    }

    const getDayCount = (date: Date) => {
        let daysInMonth = getDaysInMonth(date);

        // find where to start calendar day of week
        let dayOfWeek = getDay(new Date(date.getFullYear(), date.getMonth(), 1));
        let blankdaysArray = [];
        for (let i = 1; i <= dayOfWeek; i++) {
            blankdaysArray.push(i);
        }

        let daysArray = [];
        for (let i = 1; i <= daysInMonth; i++) {
            daysArray.push(i);
        }

        setBlankDays(blankdaysArray);
        setDayCount(daysArray);
    };

    useEffect(() => {
        getDayCount(datepickerHeaderDate)
    }, [datepickerHeaderDate])

    return (
<div
    className='bg-white mt-12 rounded-lg shadow p-4 absolute top-0 left-0'
    style={{ width: "17rem" }}
>
    <DatePickerPopoverHeader
        date={datepickerHeaderDate}
        type={type}
        onDateChange={setDatepickerHeaderDate}
        onTypeChange={setType}
    />
    {type === "date" && (
        <>
            <div className="flex flex-wrap mb-3 -mx-1">
                {DAYS.map((day, i) => (
                    <div
                        key={i}
                        style={{ width: "14.26%" }}
                        className="px-1"
                    >
                        <div className="text-gray-800 font-medium text-center text-xs">
                            {day}
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex flex-wrap -mx-1">
                {blankDays.map((_, i) => (
                    <div
                        key={i}
                        style={{ width: "14.26%" }}
                        className="text-center border p-1 border-transparent text-sm"
                    ></div>
                ))}
                {dayCount.map((d, i) => (
                    <div
                        key={i}
                        style={{ width: "14.26%" }}
                        className="px-1 mb-1"
                    >
                        <div
                            onClick={setDateValue(d)}
                            className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
                                isToday(d)
                                    ? "bg-blue-500 text-white"
                                    : "text-gray-700 hover:bg-blue-200"
                            }`}
                        >
                            {d}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )}
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
                                    datepickerHeaderDate.getFullYear(),
                                    i,
                                    datepickerHeaderDate.getDate()
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