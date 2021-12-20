import {Popover, Transition} from '@headlessui/react'
import {Fragment, useState} from 'react'
import {usePopper} from 'react-popper'
import {Portal} from 'next/dist/client/portal'

//TODO: ButtonWithPopover
export function ViewPicker() {
	const [referenceElement, setReferenceElement] = useState<HTMLButtonElement|null>(null)
	const [popperElement, setPopperElement] = useState<HTMLDivElement|null>()
	const {styles, attributes} = usePopper(referenceElement, popperElement)

	//Panel всегда должна быть в DOM, т. к. за ней следит popper. Поэтому Transition закинут внутрь: https://popper.js.org/docs/v2/modifiers/hide/
	return (
		<Popover>
			{({open}) => (
				<>
					<Popover.Button
						ref={setReferenceElement}
					>
						Solutions
					</Popover.Button>
					<Portal type='popover-layer'>
						<Popover.Panel
							className='z-10'
							ref={setPopperElement}
							style={styles.popper}
							{...attributes.popper}
						>
							<Transition
								as={Fragment}
								enter='transition ease-out duration-200'
								enterFrom='opacity-0 translate-y-1'
								enterTo='opacity-100 translate-y-0'
								leave='transition ease-in duration-150'
								leaveFrom='opacity-100 translate-y-0'
								leaveTo='opacity-0 translate-y-1'
							>
								<div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-7'>
									<div>HelloHelloHello!</div>
								</div>
							</Transition>
						</Popover.Panel>
					</Portal>
				</>
			)}
		</Popover>
	)
}