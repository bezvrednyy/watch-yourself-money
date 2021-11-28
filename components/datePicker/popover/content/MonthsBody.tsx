import {format, getMonth, getYear} from 'date-fns'

type MonthsBodyProps = {
    selectedDate: Date,
    newSelectedDate: Date,
    onMonthChanged: (month: number) => void,
}

function MonthsBody({
    selectedDate,
    newSelectedDate,
    onMonthChanged,
}: MonthsBodyProps) {
    const isSelectedMonth = (month: number) =>
        getYear(selectedDate) === getYear(newSelectedDate)
        && month === getMonth(newSelectedDate)

    return (
<div className="flex flex-wrap -mx-1">
    {Array(12)
        .fill(null)
        .map((_, monthNumber) => <MonthItem
            key={monthNumber}
            title={format(
                new Date(newSelectedDate.getFullYear(), monthNumber, newSelectedDate.getDate()),
                "MMM"
            )}
            isSelectedMonth={isSelectedMonth(monthNumber)}
            onMonthChanged={() => onMonthChanged(monthNumber)}
        />)}
</div>)
}

type MonthItemProps = {
    title: string,
    onMonthChanged: () => void,
    isSelectedMonth: boolean,
}

function MonthItem({
    title,
    onMonthChanged,
    isSelectedMonth,
}: MonthItemProps) {
    return (
<div onClick={onMonthChanged} style={{ width: "25%" }}>
    <div className={`cursor-pointer p-5 font-semibold text-center text-sm rounded-lg hover:bg-gray-200 ${
        isSelectedMonth
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-blue-200"
    }`}>
        {title}
    </div>
</div>
    )
}

export {
    MonthsBody,
}
