import {joinStrings} from '../../../../../common/utils/string'
import styles from './TextFieldInput.module.css'
import {useRef} from 'react'
import {useEventHandler} from '../../../hooks/useEventHandler'
import {TextFieldInputProps} from '../textFieldProps'

export function TextFieldInput({
	value,
	onInput,
	required,
	maxLength,
	placeholder,
	inputType,
	inputClass,
	onFocus,
	onBlur,
}: TextFieldInputProps) {
	const ref = useRef<HTMLInputElement>(null)
	useEventHandler(ref, 'keydown', event => {
		if (event.code === 'Enter') {
			ref.current && ref.current.blur()
			onBlur && onBlur()
		}
	})

	return (
		<input
			ref={ref}
			value={value}
			onInput={event => onInput(event.currentTarget.value)}
			onFocus={onFocus}
			onBlur={onBlur}
			required={required}
			className={joinStrings(
				inputClass,
				inputType === 'number' && styles['number-input'],
			)}
			placeholder={placeholder}
			maxLength={maxLength}
			type={inputType}
		/>
	)
}