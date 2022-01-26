import {addMonths, addYears, format, subMonths, subYears} from 'date-fns'
import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/outline'
import type {DatepickerType} from '../../model/DatePickerData'

type DatePickerPopoverHeaderProps = {
    date: Date,
    type: DatepickerType,
    onDateChange: (date: Date) => void,
    onTypeChange: (type: DatepickerType) => void,
}

function DatePickerPopoverHeader({
	date,
	type,
	onDateChange,
	onTypeChange,
}: DatePickerPopoverHeaderProps) {

	const showMonthPicker = () => onTypeChange('month')
	const showYearPicker = () => onTypeChange('date')

	const decrement = () => {
		switch (type) {
			case 'date':
				onDateChange(subMonths(date, 1))
				break
			case 'month':
				onDateChange(subYears(date, 1))
				break
		}
	}

	const increment = () => {
		switch (type) {
			case 'date':
				onDateChange(addMonths(date, 1))
				break
			case 'month':
				onDateChange(addYears(date, 1))
				break
		}
	}

	return (
		<div className='flex justify-between items-center mb-2'>
			<ArrowButton type='left' onClick={decrement} />
			{type === 'date' && (
				<div
					onClick={showMonthPicker}
					className='flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg'
				>
					<p className='text-center'>
						{format(date, 'MMMM')}
					</p>
				</div>
			)}
			<div
				onClick={showYearPicker}
				className='flex-grow p-1 text-lg font-bold text-gray-800 cursor-pointer hover:bg-gray-200 rounded-lg'
			>
				<p className='text-center'>
					{format(date, 'yyyy')}
				</p>
			</div>
			<ArrowButton type='right' onClick={increment} />
		</div>
	)
}


type ArrowButtonProps = {
    type: 'left'|'right',
    onClick: () => void,
}

function ArrowButton({
	type,
	onClick,
}: ArrowButtonProps) {
	const iconClassName = 'w-6 h-6 text-gray-600'

	const iconComponent = type === 'left'
		? <ChevronLeftIcon className={iconClassName} />
		: <ChevronRightIcon className={iconClassName} />
	return (
		<button
			type='button'
			className='transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 rounded-full'
			onClick={onClick}
		>
			{iconComponent}
		</button>
	)
}

export {
	DatePickerPopoverHeader,
}