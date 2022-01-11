
//TODO:uikit buttons и т. п.
type PopoverDefaultProps = {
	createContent: () => JSX.Element,
}

export function PopoverDefault({
	createContent,
}: PopoverDefaultProps) {
	return (
		<div
			className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white px-5 py-2'
			onMouseDown={e => e.stopPropagation()}
		>
			{createContent()}
		</div>
	)
}