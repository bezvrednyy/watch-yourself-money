import {useState} from 'react'
import {checkNever} from '../../../../../../../common/utils/checkNever'
import {joinStrings} from '../../../../../../../common/utils/string'
import {Badge} from '../../../../../../common/uikit/Badge'
import {getOutlineIconById} from '../../../../../../common/uikit/icons/getOutlineIconById'
import {PopupDefault} from '../../../../../../common/uikit/PopupDefault'
import styles from '../../../common/common.module.css'
import {EditCategoryPopupSubcategoryData, SubcategoryChangeType} from '../../model/editCategoryPopupAtoms'
import {useBadgePopupButtons} from './useBadgePopupButtons'
import { SubcategoryBadgePopupContent } from '../../../common/SubcategoryBadgePopupContent'

function getBgColorByType(type: SubcategoryChangeType): string {
	switch (type) {
		case 'default':
			return 'bg-purple-300'
		case 'new':
			return 'bg-green-300'
		case 'removed':
			return 'bg-red-300'
		case 'turnToMain':
			return 'bg-gray-300'
		case 'edited':
			return 'bg-blue-300'
		default:
			checkNever(type, `Unknown type: ${type}`)
			return ''
	}
}

function SubcategoryBadge(props: EditCategoryPopupSubcategoryData) {
	const {
		title: initTitle,
		iconId: initIconId,
		changeType,
	} = props
	const [show, setShow] = useState(false)
	const [iconId, setIconId] = useState(initIconId)
	const [title, setTitle] = useState(initTitle)
	const badgeColorClass = getBgColorByType(changeType)
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
				'rounded-full mr-1 mt-2',
				styles.badge,
				badgeColorClass,
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

export {
	SubcategoryBadge,
}