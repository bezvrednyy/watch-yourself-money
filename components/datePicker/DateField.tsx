import {ReactElement} from 'react'
import {format} from 'date-fns'
import {DatePickerInputStyle} from './model/DatePickerData'

type DateFieldProps = {
    date: Date,
    icon?: ReactElement,
    style: DatePickerInputStyle,
}

function DateField({
	date,
	icon,
	style,
}: DateFieldProps) {
	return (
		<div className='flex items-center'>
			<input
				type='text'
				readOnly
				className={`cursor-pointer w-full p-2 leading-none rounded-lg focus:outline-none text-gray-600 font-medium ${
            style === 'block'
                ? 'bg-white shadow-sm focus:shadow-outline'
                : 'bg-transparent'
        }`}
				placeholder='Select date'
				value={format(date, 'yyyy-MM-dd')}
			/>
			{icon && <Icon icon={icon} />}
		</div>)
}

type IconProps = {
    icon: ReactElement,
}

function Icon(props: IconProps) {
	return (
		<div className='cursor-pointer absolute top-0 right-0 px-3 py-2'>
			{props.icon}
		</div>)
}

export {
	DateField,
}