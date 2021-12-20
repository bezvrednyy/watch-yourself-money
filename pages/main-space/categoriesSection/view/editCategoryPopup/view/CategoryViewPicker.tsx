import {Button} from '../../../../../../components/button/Button'
import {PopoverDefault} from '../../../../../../components/popovers/PopoverDefault'
import {ButtonWithPopover} from '../../../../../../components/button/buttonWithPopover/ButtonWithPopover'

export function CategoryViewPicker() {
	return <ButtonWithPopover
		createButton={() => <Button
			style='primary'
			structure='text'
			text='Sign up'
		/>}
		createPopover={() => <PopoverDefault
			createContent={() => <div>Content</div>}
		/>}
	/>
}

function PopoverContent() {
	return (
		<>

		</>
	)
}

function IconSelections() {
	return (
		<div>
			Icons
		</div>
	)
}

function ColorSelections() {
	return (
		<div>
			Colors
		</div>
	)
}