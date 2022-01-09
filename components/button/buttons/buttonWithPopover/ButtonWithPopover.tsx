import {Popover, Transition} from '@headlessui/react'
import {useState} from 'react'
import {usePopper} from 'react-popper'
import {Portal} from 'next/dist/client/portal'

type ButtonWithPopoverProps = {
	createButton: () => JSX.Element,
	createPopover: () => JSX.Element
}

export function ButtonWithPopover({
	createButton,
	createPopover,
}: ButtonWithPopoverProps) {
	const [referenceElement, setReferenceElement] = useState<HTMLButtonElement|null>(null)
	const [popperElement, setPopperElement] = useState<HTMLDivElement|null>()
	const {styles, attributes} = usePopper(referenceElement, popperElement, {
		modifiers: [{
			name: 'offset',
			options: {
				offset: [0, 5],
			},
		}],
	})

	//Panel всегда должна быть в DOM, т. к. за ней следит popper. Поэтому Transition закинут внутрь:
	// https://popper.js.org/docs/v2/modifiers/hide/
	return (
		<Popover>
			<Popover.Button
				ref={setReferenceElement}
			>
				{createButton()}
			</Popover.Button>
			<Portal type='popover-layer'>
				<Popover.Panel
					className='z-10'
					ref={setPopperElement}
					style={styles.popper}
					{...attributes.popper}
				>
					<Transition
						enter='transition ease-out duration-200'
						enterFrom='opacity-0 translate-y-1'
						enterTo='opacity-100 translate-y-0'
						leave='transition ease-in duration-150'
						leaveFrom='opacity-100 translate-y-0'
						leaveTo='opacity-0 translate-y-1'
					>
						{createPopover()}
					</Transition>
				</Popover.Panel>
			</Portal>
		</Popover>
	)
}