import styles from './ExternalLayer.module.css'
import {Transition, Dialog} from '@headlessui/react'
import {Fragment} from 'react'
import {joinClassNames} from '../../common/joinClassNames'

type ExternalLayerProps = {
	show: boolean,
	onClose: () => void,
	createJSX: () => JSX.Element,
}

export function ExternalLayer({
	show,
	onClose,
	createJSX,
}: ExternalLayerProps) {
	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog
				open={show}
				onClose={onClose}
				className='fixed z-10 inset-0 overflow-y-auto'
			>
				<div className='flex items-center justify-center min-h-screen'>
					<Transition.Child
						as={Fragment}
						enter='ease-out duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='ease-in duration-200'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Dialog.Overlay className={joinClassNames(styles.overlay, 'fixed inset-0')} />
					</Transition.Child>
					<Content createJSX={createJSX} />
				</div>
			</Dialog>
		</Transition>
	)
}

type ContentProps = {
	createJSX: () => JSX.Element,
}

function Content({
	createJSX,
}: ContentProps) {
	//Используется не как Fragment, т. к. нужен DOM-узел, к которому применять эффекты
	return (
		<Transition.Child
			enter='transition ease-out duration-300'
			enterFrom='opacity-0 scale-95'
			enterTo='opacity-100 scale-100'
			leave='transition ease-in duration-200'
			leaveFrom='opacity-100 scale-100'
			leaveTo='opacity-0 scale-95'
		>
			{createJSX()}
		</Transition.Child>
	)
}