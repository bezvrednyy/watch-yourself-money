import {ReactElement} from 'react'

type DatepickerType = "date" | "month";
type DatePickerProps = {
    selected: Date,
    label?: string,
    type?: DatepickerType,
    icon?: ReactElement,
    className?: string,
}

export type {
    DatepickerType,
    DatePickerProps,
}