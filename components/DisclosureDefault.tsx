import {Disclosure} from '@headlessui/react'
import {Fragment} from 'react'

type DisclosureDefaultProps = {
	createButton: (open: boolean) => JSX.Element,
	createPanel: () => JSX.Element
}

export default function DisclosureDefault({
	createButton,
	createPanel,
}: DisclosureDefaultProps) {
	return (
		<div className='w-full px-4 pt-16'>
			<div className='w-full max-w-md mx-auto bg-white rounded-2xl'>
				<Disclosure>
					{({open}) => (
						<>
							<Disclosure.Panel>
								{createPanel()}
							</Disclosure.Panel>
							<Disclosure.Button as={Fragment}>
								{createButton(open)}
							</Disclosure.Button>
						</>
					)}
				</Disclosure>
			</div>
		</div>
	)
}