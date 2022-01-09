import {useAction, useAtom} from '@reatom/react'
import {useState} from 'react'
import {generateUuid} from '../../../../../../../common/generateRandom'
import {joinClassNames} from '../../../../../../../common/joinClassNames'
import {verify} from '../../../../../../../common/verify'
import {Badge} from '../../../../../../../components/Badge'
import {Button} from '../../../../../../../components/button/Button'
import {OutlineIconId, getOutlineIconById} from '../../../../../../../components/icons/getOutlineIconById'
import {PopupDefault} from '../../../../../../../components/PopupDefault'
import {editableCategoryIdAtom} from '../../../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from '../../model/editableCategoryAtom'
import {SubcategoryBadgePopupContent} from './SubcategoryBadge'
import styles from './SubcategoryBadge.module.css'

export function AddSubcategoryBadge() {
	const [show, setShow] = useState(false)
	const [iconId, setIconId] = useState<OutlineIconId>('outline-bookmark')
	const [title, setTitle] = useState('')
	const handleAddSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.add)
	const [editableCategoryId] = useAtom(editableCategoryIdAtom)

	return <>
		<Badge
			label={'Add'}
			className={joinClassNames(
				'bg-green-200 rounded-full mr-1 mt-2',
				styles.badge,
			)}
			createIcon={() => {
				const IconFC = getOutlineIconById('outline-plus-sm')
				return <IconFC className='w-5 h-5' />
			}}
			onClick={() => setShow(true)}
			cornerType='rounded'
		/>
		<PopupDefault
			show={show}
			createContent={() => <SubcategoryBadgePopupContent
				iconId={iconId}
				setIconId={setIconId}
				title={title}
				setTitle={setTitle}
			/>}
			buttons={[<Button
				key='add'
				style='blue-default'
				onClick={() => {
					if (title === '') {
						return
					}
					handleAddSubcategory({
						id: generateUuid(),
						parentCategoryId: verify(editableCategoryId),
						title,
						type: 'EXPENSES',
						iconId,
						colorId: 'transparent',
					})
					setShow(false)
				}}
				structure='text'
				text='Add'
			/>]}
		/>
	</>
}