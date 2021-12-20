
//TODO: buttons и т. п.
type PopoverDefaultProps = {
	createContent: () => JSX.Element,
}

export function PopoverDefault({
	createContent,
}: PopoverDefaultProps) {
	return (
		<div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-7'>
			{createContent()}
		</div>
	)
}