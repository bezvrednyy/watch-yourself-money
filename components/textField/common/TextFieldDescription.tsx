type DescriptionProps = {
	text: string,
	isError: boolean,
}

export function TextFieldDescription({
	text,
	isError,
}: DescriptionProps) {
	let className = 'text-sm'
	className += isError ? 'text-red-500' : 'text-gray-500'
	return <span className={className}>
		{text}
	</span>
}
