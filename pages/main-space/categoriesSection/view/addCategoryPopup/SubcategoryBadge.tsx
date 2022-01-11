import {useAction} from '@reatom/react'
import {useState} from 'react'
import {joinStrings} from '../../../../../common/utils/string'
import {Badge} from '../../../../../commonClient/uikit/Badge'
import {Button} from '../../../../../commonClient/uikit/button/Button'
import {
	OutlineIconId,
	getOutlineIconById,
} from '../../../../../commonClient/uikit/icons/getOutlineIconById'
import {PopupDefault} from '../../../../../commonClient/uikit/PopupDefault'
import {CategoryData} from '../../../model/categoriesAtom'
import {SubcategoryBadgePopupContent} from '../common/SubcategoryBadgePopupContent'
import {addCategoryPopupAtoms} from './model/addCategoryPopupAtoms'
import styles from '../common/common.module.css'

function SubcategoryBadge(props: CategoryData) {
	const {
		title: initTitle,
		iconId: initIconId,
	} = props
	const [show, setShow] = useState(false)
	const [iconId, setIconId] = useState(initIconId)
	const [title, setTitle] = useState(initTitle)
	const buttons = useBadgePopupButtons({
		...props,
		newTitle: title,
		newIconId: iconId,
		setShow,
	})

	return <>
		<Badge
			label={initTitle}
			className={joinStrings(
				'rounded-full mr-1 mt-2 bg-purple-300',
				styles.badge,
			)}
			createIcon={() => {
				const IconFC = getOutlineIconById(initIconId)
				return <IconFC className='w-4 h-4' />
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
			buttons={buttons}
		/>
	</>
}

type UseBadgePopupButtonsParams = CategoryData & {
	newTitle: string,
	newIconId: OutlineIconId,
	setShow: (v: boolean) => void
}

function useBadgePopupButtons({
	setShow,
	newIconId,
	newTitle,
	...props
}: UseBadgePopupButtonsParams): Array<JSX.Element> {
	const handleUpdateSubcategory = useAction(addCategoryPopupAtoms.subcategoriesAtom.update)
	const handleRemoveSubcategory = useAction(addCategoryPopupAtoms.subcategoriesAtom.remove)

	return [
		<Button
			key='save'
			style='blue-default'
			onClick={() => {
				handleUpdateSubcategory({
					...props,
					iconId: newIconId,
					title: newTitle,
				})
				setShow(false)
			}}
			structure='text'
			text='Save'
		/>,
		<Button
			key='remove'
			style='destructure'
			onClick={() => {
				handleRemoveSubcategory(props.id)
				setShow(false)
			}}
			structure='text'
			text='Remove'
		/>,
		<Button
			key='cancel'
			style='secondary'
			onClick={() => setShow(false)}
			structure='text'
			text='Cancel'
		/>,
	]
}

export {
	SubcategoryBadge,
}