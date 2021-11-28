import {getDay, getDaysInMonth, getMonth, getYear} from 'date-fns'
import {useCallback, useEffect, useState} from 'react'

const ITEM_WIDTH = '14.26%'

type DateBodyProps = {
    selectedDate: Date,
    newSelectedDate: Date,
    onSelectedChanged: (date: Date) => void,
}

function DateBody({
    selectedDate,
    newSelectedDate,
    onSelectedChanged,
}: DateBodyProps) {
    const [dayCount, setDayCount] = useState<Array<number>>([])
    const [blankDays, setBlankDays] = useState<Array<number>>([])

    const isToday = (day: number) =>
        getYear(selectedDate) === getYear(newSelectedDate)
        && getMonth(selectedDate) === getMonth(newSelectedDate)
        && day === selectedDate.getDate() //Т. к. в date-fns нет нужного метода. getDay возвращает день относительно НЕДЕЛИ

    const setDateValue = (day: number) => () => {
        const newDate = new Date(
            newSelectedDate.getFullYear(),
            newSelectedDate.getMonth(),
            day,
        )
        onSelectedChanged(newDate)
    }

    const getDayCount = useCallback((date: Date) => {
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
    }, [])

    useEffect(() => {
        getDayCount(newSelectedDate)
    }, [newSelectedDate])

    return (
<>
    <DayNamesSection />
    <div className="flex flex-wrap -mx-1">
        {blankDays.map((_, i) => (
            <div
                key={i}
                style={{ width: ITEM_WIDTH }}
                className="text-center border p-1 border-transparent text-sm"
            />
        ))}
        {dayCount.map((day, i) => <DayItem
            key={i}
            day={day}
            isToday={isToday(day)}
            onClick={setDateValue(day)}
        />)}
    </div>
</>)
}

function DayNamesSection() {
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return (
<div className="flex flex-wrap mb-3 -mx-1">
    {DAYS.map((day, i) => (
        <div key={i} style={{ width: ITEM_WIDTH }} className="px-1">
            <div className="text-gray-800 font-medium text-center text-xs">
                {day}
            </div>
        </div>
    ))}
</div>)
}

type DayItemProps = {
    isToday: boolean,
    day: number,
    onClick: () => void,
}

function DayItem({
    day,
    isToday,
    onClick,
}: DayItemProps) {
    return (
<div style={{ width: ITEM_WIDTH }} className="px-1 mb-1">
    <div
        onClick={onClick}
        className={`cursor-pointer text-center text-sm leading-none rounded-full leading-loose transition ease-in-out duration-100 ${
            isToday
                ? "bg-purple-400 text-white"
                : "text-gray-700 hover:bg-blue-200"
        }`}
    >
        {day}
    </div>
</div>)
}

export {
    DateBody,
}
