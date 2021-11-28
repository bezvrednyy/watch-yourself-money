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
}: DatePickerProps) {
	const [showDatepicker, setShowDatepicker] = useState(false);
	const [selectedDate, setSelectedDate] = useState(selected);
	const toggleDatepicker = () => setShowDatepicker((prev) => !prev);

	return (
<div className={joinClassNames('mb-5 w-64', className)}>
	<div className='relative'>
		<DateField
			date={selectedDate}
			onClick={toggleDatepicker}
			label={label}
			icon={icon}
		/>
		{showDatepicker && <DatePickerPopover
			selectedDate={selectedDate}
			onSelectedChanged={date => {
				setSelectedDate(date)
				setShowDatepicker(false)
			}}
			type={type}
		/>}
	</div>
</div>)
}

export {
	DatePicker,
}