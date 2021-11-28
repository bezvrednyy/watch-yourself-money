import {ReactElement} from 'react'
import {format} from 'date-fns'

type DateFieldProps = {
    date: Date,
    onClick: () => void,
    icon?: ReactElement,
    label?: string,
}

function DateField({
    date,
    onClick,
    icon,
    label,
}: DateFieldProps) {
    return (
<div>
    {label && <Label text={label} />}
    <input
        type="text"
        readOnly
        className="cursor-pointer w-full pl-4 pr-10 py-3 leading-none rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-600 font-medium"
        placeholder="Select date"
        value={format(date, "yyyy-MM-dd")}
        onClick={onClick}
    />
    {icon && <Icon icon={icon} onClick={onClick} />}
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

type IconProps = {
    onClick: () => void,
    icon: ReactElement,
}

function Icon(props: IconProps) {
    return (
<div className="cursor-pointer absolute top-0 right-0 px-3 py-2" onClick={props.onClick}>
    {props.icon}
</div>)
}

export {
    DateField,
}