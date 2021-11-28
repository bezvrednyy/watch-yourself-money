import {ReactElement} from 'react'

type DatepickerType = 'date' | 'month'
type DatePickerInputStyle = 'block' | 'string'

type DatePickerProps = {
    selected: Date,
    label?: string,
    type?: DatepickerType,
    icon?: ReactElement,
    className?: string,
    inputStyle?: DatePickerInputStyle,
}

export type {
    DatepickerType,
    DatePickerProps,
    DatePickerInputStyle,
}