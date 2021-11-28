import {useState} from 'react'
import {DateField} from './DateField'
import {joinClassNames} from '../../common/joinClassNames'
import {DatePickerPopover} from './popover/DatePickerPopover'
import type {DatePickerProps} from './model/DatePickerData'

function DatePicker({
	selected,
	label,
	type = 'date',
	icon,
	className,
	inputStyle = 'block',
}: DatePickerProps) {
	const [showDatepicker, setShowDatepicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(selected);
	const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

	return (
<div className={joinClassNames('relative', className)}>
	{label && <Label text={label} />}
	<DateField
		date={selectedDate}
		onClick={toggleDatepicker}
		icon={icon}
		style={inputStyle}
	/>
	{showDatepicker && <DatePickerPopover
		selectedDate={selectedDate}
		onSelectedChanged={date => {
			setSelectedDate(date)
			setShowDatepicker(false)
		}}
		type={type}
	/>}
</div>)
}

type LabelProps = {
	text: string,
}

function Label({ text }: LabelProps) {
	return (
<label htmlFor="datepicker" className="font-bold mb-1 text-gray-700 block">
	{text}
</label>)
}

export {
	DatePicker,
}