import {Disclosure} from '@headlessui/react'
import {Fragment} from 'react'
import {joinClassNames} from '../common/joinClassNames'

type DisclosureDefaultProps = {
	createButton: (open: boolean) => JSX.Element,
	createPanel: () => JSX.Element,
	className?: string,
}

export default function DisclosureDefault({
	createButton,
	createPanel,
	className,
}: DisclosureDefaultProps) {
	return (
		<div className={joinClassNames(
			'w-full max-w-md mx-auto bg-white rounded-2xl',
			className,
		)}>
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
	)
}