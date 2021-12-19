import {ExternalLayer} from '../../../../../components/layers/ExternalLayer'
import {TextField} from '../../../../../components/TextField'
import {useAction, useAtom} from '@reatom/react'
import {editCategoryPopupAtoms} from './model/editableCategoryAtom'
import {categoriesAtom, editableCategoryIdAtom} from '../../model/categoriesAtom'
import {verify} from '../../../../../common/verify'
import {useEffect} from 'react'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
	onSave: () => void,
}

function EditCategoryPopup(props: EditCategoryPopupProps) {
	useInitPopupAtoms()

	return <ExternalLayer
		show={props.show}
		onClose={props.onClose}
		createJSX={() => <EditCategoryPopupContent {...props} />}
	/>
}

function useInitPopupAtoms() {
	const [categories] = useAtom(categoriesAtom)
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)
	const handleSetSubcategories = useAction(editCategoryPopupAtoms.subcategoriesAtom.set)

	useEffect(() => {
		if (editableCategoryId === null) {
			return
		}

		const category = verify(
			categories.find(x => x.id === editableCategoryId),
			`Unexpected error: category not found`,
		)
		handleSetTitle(category.title)
		handleSetSubcategories(
			categories.filter(x => x.parentCategoryId === category.id),
		)
	}, [
		categories,
		editableCategoryId,
		handleSetSubcategories,
		handleSetTitle,
	])
}


function EditCategoryPopupContent({
	onClose,
	onSave,
}: EditCategoryPopupProps) {
	const [title] = useAtom(editCategoryPopupAtoms.titleAtom)
	const handleSetTitle = useAction(editCategoryPopupAtoms.titleAtom.set)

	return (
		<div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl'>
			<TextField
				value={title}
				onInput={handleSetTitle}
				placeholder={'Category name'}
				required={true}
			/>
			<div className='mt-2'>
				<p className='text-sm text-gray-500'>
					Your payment has been successfully submitted. We’ve sent you
					an email with all of the details of your order.
				</p>
			</div>

			<div className='mt-4'>
				<button
					type='button'
					className='inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'
					onClick={onClose}
				>
					Got it, thanks!
				</button>
			</div>
		</div>
	)
}

export {
	EditCategoryPopup,
}