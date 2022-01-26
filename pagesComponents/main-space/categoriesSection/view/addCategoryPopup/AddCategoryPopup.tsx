import {useAction} from '@reatom/react'
import {useEffect} from 'react'
import {useAloneAction} from '../../../../common/declareAloneAction'
import {generateUuid} from '../../../../../common/utils/generateRandom'
import {Button} from '../../../../common/uikit/button/Button'
import {PopupDefault} from '../../../../common/uikit/PopupDefault'
import {addDeps} from '../../../../common/utils/addDeps'
import {AddCategoryPopupContent} from './AddCategoryPopupContent'
import {addCategoryPopupAtoms} from './model/addCategoryPopupAtoms'
import {addCategoryPopupSaveData} from './model/externalActions'

type EditCategoryPopupProps = {
	show: boolean,
	onClose: () => void,
}

export function AddCategoryPopup({
	show,
	onClose,
}: EditCategoryPopupProps) {
	useInitPopupAtoms(show)
	const handleSaveData = useAloneAction(addCategoryPopupSaveData)

	return <PopupDefault
		show={show}
		createContent={() => <AddCategoryPopupContent />}
		buttons={[
			<Button
				key='save'
				style='blue-default'
				onClick={() => handleSaveData({ onClose })}
				structure='text'
				text='Save'
			/>,
			<Button
				key='cancel'
				style='secondary'
				onClick={onClose}
				structure='text'
				text='Cancel'
			/>,
		]}
		className='w-full max-w-md'
	/>
}

function useInitPopupAtoms(show: boolean) {
	const handleSetNormal = useAction(addCategoryPopupAtoms.statusesAtom.setNormal)
	const handleSetTitle = useAction(addCategoryPopupAtoms.titleAtom.set)
	const handleSetSubcategories = useAction(addCategoryPopupAtoms.subcategoriesAtom.set)
	const handleSetColor = useAction(addCategoryPopupAtoms.colorIdAtom.set)
	const handleSetIcon = useAction(addCategoryPopupAtoms.iconIdAtom.set)
	const handleSetCategoryId = useAction(addCategoryPopupAtoms.categoryIdAtom.set)

	useEffect(() => {
		addDeps(show)
		if (!show) return

		handleSetNormal()
		handleSetCategoryId(generateUuid())
		handleSetTitle('')
		handleSetSubcategories([])
		handleSetColor('green#400')
		handleSetIcon('outline-shopping-bag')
	}, [
		handleSetCategoryId,
		handleSetColor,
		handleSetIcon,
		handleSetNormal,
		handleSetSubcategories,
		handleSetTitle,
		show,
	])
}