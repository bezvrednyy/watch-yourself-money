import {Menu} from '@headlessui/react'
import {useState} from 'react'
import {usePopper} from 'react-popper'
import {joinStrings} from '../../../common/utils/string'

type MenuDefaultProps = {
	createButton: () => JSX.Element,
	items: Array<JSX.Element>, //Menu.Item uikit
	popoverClass?: string,
	className?: string,
}

export function MenuDefault({
	createButton,
	items,
	popoverClass,
	className,
}: MenuDefaultProps) {
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

	return (
		<Menu as='div' className={joinStrings(
			'relative inline-block text-left',
			className,
		)}>
			<Menu.Button className='w-full' ref={setReferenceElement}>
				{createButton()}
			</Menu.Button>
			<Menu.Items
				className={joinStrings(
					'rounded-md shadow-lg z-10',
					popoverClass,
				)}
				ref={setPopperElement}
				style={styles.popper}
				{...attributes.popper}
			>
				{items}
			</Menu.Items>
		</Menu>
	)
}