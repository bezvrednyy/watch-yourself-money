import {joinClassNames} from '../../../common/joinClassNames'
import styles from './EditCategoryPopup.module.css'
import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from 'react'

type EditCategoryPopupProps = {
	show: boolean,
	categoryId: number|null,
	onClose: () => void,
	onSave: () => void,
}

function EditCategoryPopup({
	show,
	categoryId,
	onClose,
	onSave,
}: EditCategoryPopupProps) {
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

					<Transition.Child
						as={Fragment}
						enter='transition ease-out duration-300'
						enterFrom='opacity-0 scale-95'
						enterTo='opacity-100 scale-100'
						leave='transition ease-in duration-200'
						leaveFrom='opacity-100 scale-100'
						leaveTo='opacity-0 scale-95'
					>
						<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl'>
							<Dialog.Title>Редактирвоание категории</Dialog.Title>
							<Dialog.Description>
								This will permanently deactivate your account
							</Dialog.Description>

							<p>
								Are you sure you want to deactivate your account? All of your data will
								be permanently removed. This action cannot be undone.
							</p>

							<button onClick={onClose}>Deactivate</button>
							<button onClick={onClose}>Cancel</button>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	)
}

export {
	EditCategoryPopup,
}