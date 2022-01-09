import {ButtonWithPopover} from '../button/buttons/buttonWithPopover/ButtonWithPopover'
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

	return (
		<div className={joinClassNames('relative', className)}>
			{label && <Label text={label} />}
			<ButtonWithPopover
				createButton={() => <DateField
					date={date}
					icon={icon}
					style={inputStyle}
				/>}
				createPopover={({closeFn}) => <DatePickerPopover
					selectedDate={date}
					onSelectedChanged={value => {
						onSelectedChanged(value)
						closeFn()
					}}
					type={type}
				/>}
			/>
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