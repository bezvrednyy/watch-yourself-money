type TextFieldType = 'text'|'password'|'email'

type TextField = {
	value: string,
	onInput: (v: string) => void,
	label?: string,
	maxLength?: number,
	description?: string,
	errorMessage?: string,
	placeholder?: string,
	required?: boolean,
	type?: TextFieldType,
}

function TextField({
	value,
	onInput,
	label,
	maxLength,
	description,
	errorMessage,
	placeholder,
	required,
	type = 'text',
}: TextField) {
	const descriptionText = errorMessage || description

	return (
		<div>
			{label && <Label text={label} />}
			<input
				value={value}
				onInput={event => onInput(event.currentTarget.value)}
				required={required}
				className='appearance-none rounded-md relative block w-full px-3 py-2 border-2 border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
				placeholder={placeholder}
				maxLength={maxLength}
				type={type}
			/>
			{descriptionText && <Description text={descriptionText} isError={!!errorMessage}/>}
		</div>)
}

type LabelProps = {
	text: string,
}

function Label({
	text,
}: LabelProps) {
	return <label>{text}</label>
}

type DescriptionProps = {
	text: string,
	isError: boolean,
}

function Description({
	text,
	isError,
}: DescriptionProps) {
	let className = 'text-sm'
	className += isError ? 'text-red-500' : 'text-gray-500'
	return <span className={className}>
		{text}
	</span>
}

export {
	TextField,
}