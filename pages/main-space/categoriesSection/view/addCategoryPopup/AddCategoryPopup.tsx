import {useAction} from '@reatom/react'
import {useEffect} from 'react'
import {useAloneAction} from '../../../../../commonClient/declareAloneAction'
import {generateUuid} from '../../../../../common/utils/generateRandom'
import {Button} from '../../../../../commonClient/uikit/button/Button'
import {PopupDefault} from '../../../../../commonClient/uikit/PopupDefault'
import {AddCategoryPopupContent} from './AddCategoryPopupContent'
import {addCategoryPopupAtoms} from './model/addCategoryPopupAtoms'
import {addCategoryPopupSaveData} from './model/externalHandlers'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
}

export function AddCategoryPopup({
	show,
	onClose,
}: EditCategoryPopupProps) {
	const handleSaveData = useAloneAction(addCategoryPopupSaveData)
	const handleSetCategoryId = useAction(addCategoryPopupAtoms.categoryIdAtom.set)

	useEffect(() => {
		handleSetCategoryId(generateUuid())
	}, [handleSetCategoryId])

	return <PopupDefault
		show={show}
		createContent={() => <AddCategoryPopupContent />}
		buttons={[
			<Button
				key='save'
				style='blue-default'
				onClick={() => {
					handleSaveData({
						onClose,
					})
				}}
				structure='text'
				text='Save'
			/>,
			<Button
				key='cancel'
				style='secondary'
				onClick={onClose} //TODO:category реализовать очистку атомов попапа
				structure='text'
				text='Cancel'
			/>,
		]}
		className='w-full max-w-md'
	/>
}