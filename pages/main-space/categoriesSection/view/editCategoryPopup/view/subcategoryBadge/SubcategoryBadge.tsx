import {useAtom} from '@reatom/react'
import {useState} from 'react'
import {checkNever} from '../../../../../../../common/checkNever'
import {joinClassNames} from '../../../../../../../common/joinClassNames'
import {Badge} from '../../../../../../../components/Badge'
import {getOutlineIconById} from '../../../../../../../components/icons/getOutlineIconById'
import {PopupDefault} from '../../../../../../../components/PopupDefault'
import {CategoryData} from '../../../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from '../../model/editableCategoryAtom'
import styles from '../../../common/common.module.css'
import {useBadgePopupButtons} from './useBadgePopupButtons'
import { SubcategoryBadgePopupContent } from '../../../common/SubcategoryBadgePopupContent'

type SubcategoryType = 'default'|'removed'|'turnInMain'|'new'

function useSubcategoryType(id: string): SubcategoryType {
	const [haveBecomeMainCategoriesIdsSet] = useAtom(editCategoryPopupAtoms.haveBecomeMainCategoriesIdsSetAtom)
	const [removedSubcategoryIdsSet] = useAtom(editCategoryPopupAtoms.removedSubcategoryIdsSetAtom)
	const [newSubcategoriesIdsSet] = useAtom(editCategoryPopupAtoms.newSubcategoriesIdsSetAtom)

	if (removedSubcategoryIdsSet.has(id)) return 'removed'
	if (newSubcategoriesIdsSet.has(id)) return 'new'
	if (haveBecomeMainCategoriesIdsSet.has(id)) return 'turnInMain'
	return 'default'
}

function getBgColorByType(type: SubcategoryType): string {
	switch (type) {
		case 'default':
			return 'bg-purple-300'
		case 'new':
			return 'bg-green-300'
		case 'removed':
			return 'bg-red-300'
		case 'turnInMain':
			return 'bg-gray-300'
		default:
			checkNever(type, `Unknown type: ${type}`)
			return ''
	}
}

function SubcategoryBadge(props: CategoryData) {
	const {
		title: initTitle,
		iconId: initIconId,
	} = props
	const [show, setShow] = useState(false)
	const [iconId, setIconId] = useState(initIconId)
	const [title, setTitle] = useState(initTitle)
	const type = useSubcategoryType(props.id)
	const badgeColorClass = getBgColorByType(type)
	const buttons = useBadgePopupButtons({
		...props,
		newTitle: title,
		newIconId: iconId,
		setShow,
	})

	return <>
		<Badge
			label={initTitle}
			className={joinClassNames(
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
	useSubcategoryType,
}