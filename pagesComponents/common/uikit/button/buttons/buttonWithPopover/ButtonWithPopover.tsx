import {Popover, Transition} from '@headlessui/react'
import {useState} from 'react'
import {usePopper} from 'react-popper'
import {Portal} from 'next/dist/client/portal'
import {joinStrings} from '../../../../../../common/utils/string'

export type PopoverContentProps = {
	closeFn: () => void,
}

type ButtonWithPopoverProps = {
	createButton: () => JSX.Element,
	createPopover: (params: PopoverContentProps) => JSX.Element,
	className?: string,
	popoverClass?: string,
}

export function ButtonWithPopover({
	createButton,
	createPopover,
	className,
	popoverClass,
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
		<Popover className={className}>
			<Popover.Button ref={setReferenceElement} className='focus:outline-none'>
				{createButton()}
			</Popover.Button>
			<Portal type='popover-layer'>
				<Popover.Panel
					className={joinStrings('z-10', popoverClass)}
					ref={setPopperElement}
					style={styles.popper}
					{...attributes.popper}
				>
					{({ close }) => (
						<Transition
							enter='transition ease-out duration-200'
							enterFrom='opacity-0 translate-y-1'
							enterTo='opacity-100 translate-y-0'
							leave='transition ease-in duration-150'
							leaveFrom='opacity-100 translate-y-0'
							leaveTo='opacity-0 translate-y-1'
						>
							{createPopover({
								closeFn: close,
							})}
						</Transition>
					)}
				</Popover.Panel>
			</Portal>
		</Popover>
	)
}