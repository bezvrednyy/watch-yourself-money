import {useAction, useAtom} from '@reatom/react'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {TextField} from '../../../../../components/TextField'
import {CategoryViewPicker} from './view/CategoryViewPicker'

type EditCategoryPopupContentProps = {
	onClose: () => void,
	onSave: () => void,
}

function EditCategoryPopupContent({
	onClose,
	onSave,
}: EditCategoryPopupContentProps) {
	const [title] = useAtom(editCategoryPopupAtoms.titleAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)

	return (
		<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl'>
			<div className='flex space-x-3 items-center'>
				<CategoryViewPicker/>
				<TextField
					value={title}
					onInput={handleSetTitle}
					placeholder={'Category name'}
					required={true}
				/>
			</div>

			<div className='mt-4'>
				<button
					type='button'
					className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
					onClick={onClose}
				>
					Save
				</button>
			</div>
		</div>
	)
}

export {
	EditCategoryPopupContent,
}