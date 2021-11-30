import {useState} from 'react'
import {DateField} from './DateField'
import {joinClassNames} from '../../common/joinClassNames'
import {DatePickerPopover} from './popover/DatePickerPopover'
import type {DatePickerProps} from './model/DatePickerData'

function DatePicker({
	date,
	onSelectedChanged,
	label,
	type = 'date',
	icon,
	className,
	inputStyle = 'block',
}: DatePickerProps) {
	const [showDatepicker, setShowDatepicker] = useState(false)
	const toggleDatepicker = () => setShowDatepicker(prev => !prev)

	return (
		<div className={joinClassNames('relative', className)}>
			{label && <Label text={label} />}
			<DateField
				date={date}
				onClick={toggleDatepicker}
				icon={icon}
				style={inputStyle}
			/>
			{showDatepicker && <DatePickerPopover
				selectedDate={date}
				onSelectedChanged={value => {
					onSelectedChanged(value)
					setShowDatepicker(false)
				}}
				type={type}
			/>}
		</div>)
}

type LabelProps = {
	text: string,
}

function Label({text}: LabelProps) {
	return (
		<label htmlFor='datepicker' className='font-bold mb-1 text-gray-700 block'>
			{text}
		</label>)
}

export {
	DatePicker,
}