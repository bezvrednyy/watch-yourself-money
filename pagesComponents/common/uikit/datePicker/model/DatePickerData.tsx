import {ReactElement} from 'react'

type DatepickerType = 'date' | 'month'

type DatePickerProps = {
    date: Date,
    onSelectedChanged: (date: Date) => void,
    label?: string,
    type?: DatepickerType,
    icon?: ReactElement,
    className?: string,
    inputClass?: string,
}

export type {
	DatepickerType,
	DatePickerProps,
}