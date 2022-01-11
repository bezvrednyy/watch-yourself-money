import {ReactElement} from 'react'
import {format} from 'date-fns'
import {joinStrings} from '../../../common/utils/string'

type DateFieldProps = {
    date: Date,
    icon?: ReactElement,
	inputClass?: string,
}

function DateField({
	date,
	icon,
	inputClass,
}: DateFieldProps) {
	return (
		<div className='flex items-center'>
			<input
				type='text'
				readOnly
				className={joinStrings(
					'w-full p-2 leading-none rounded-lg text-gray-600 font-medium',
					'cursor-pointer focus:outline-none',
					inputClass,
				)}
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