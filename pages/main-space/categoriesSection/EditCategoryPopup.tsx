import {ExternalLayer} from '../../../components/layers/ExternalLayer'
import {Dialog} from '@headlessui/react'

type EditCategoryPopupProps = {
	show: boolean,
	categoryId: number|null,
	onClose: () => void,
	onSave: () => void,
}

function EditCategoryPopup(props: EditCategoryPopupProps) {
	return <ExternalLayer
		show={props.show}
		onClose={props.onClose}
		createJSX={() => <EditCategoryPopupContent {...props} />}
	/>
}

function EditCategoryPopupContent({
	categoryId,
	onClose,
	onSave,
}: EditCategoryPopupProps) {
	return (
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
	)
}

export {
	EditCategoryPopup,
}