import styles from './ExternalLayer.module.css'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {joinStrings} from '../../../common/utils/string'

type ExternalLayerProps = {
	show: boolean,
	onOverlayClick?: () => void,
	createComponent: () => JSX.Element,
}

export function ExternalLayer({
	show,
	onOverlayClick,
	createComponent,
}: ExternalLayerProps) {
	return (
		<Transition appear show={show} as={Fragment}>
			<Dialog
				open={show}
				onClose={() => onOverlayClick && onOverlayClick()}
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
						<Dialog.Overlay className={joinStrings(styles.overlay, 'fixed inset-0')} />
					</Transition.Child>
					<Content createComponent={createComponent} />
				</div>
			</Dialog>
		</Transition>
	)
}

type ContentProps = {
	createComponent: () => JSX.Element,
}

function Content({
	createComponent,
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
			{createComponent()}
		</Transition.Child>
	)
}