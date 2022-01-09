import {useAtom} from '@reatom/react'
import {useState} from 'react'
import {checkNever} from '../../../../../../../common/checkNever'
import {getColorById} from '../../../../../../../common/colors/theme'
import {joinClassNames} from '../../../../../../../common/joinClassNames'
import {Badge} from '../../../../../../../components/Badge'
import {
	OutlineIconId,
	getDefaultIconIds,
	getOutlineIconById,
} from '../../../../../../../components/icons/getOutlineIconById'
import {PopupDefault} from '../../../../../../../components/PopupDefault'
import {RoundedSquare} from '../../../../../../../components/RoundedSquare'
import {TextField} from '../../../../../../../components/textField/TextField'
import {CategoryData} from '../../../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from '../../model/editableCategoryAtom'
import styles from './SubcategoryBadge.module.css'
import {useBadgePopupButtons} from './useBadgePopupButtons'

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
		title,
		iconId,
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

type PopoverContentProps = {
	iconId: OutlineIconId,
	setIconId: (v: OutlineIconId) => void,
	title: string,
	setTitle: (v: string) => void,
}

function SubcategoryBadgePopupContent({
	iconId,
	setIconId,
	title,
	setTitle,
}: PopoverContentProps) {
	return (
		<div className='w-80'>
			<TextField
				style='default'
				value={title}
				onInput={setTitle}
				placeholder={'Category name'}
				required={true}
			/>
			<div className='flex justify-between flex-wrap max-h-40 overflow-y-scroll mt-4 pr-1 relative left-1 scrollbar'>
				{getDefaultIconIds().map(id => <RoundedSquare
					key={id}
					bgHexColor={getColorById('white')}
					className={joinClassNames(
						'transform transition hover:scale-105 cursor-pointer w-7 h-7 mb-1',
						iconId === id ? 'border-2 border-purple-600 rounded-full' : null,
					)}
					rounded='full'
					createIcon={() => {
						const IconFC = getOutlineIconById(id)
						return <IconFC className='w-6 h-6 text-black shadow-none' />
					}}
					onClick={() => setIconId(id)}
				/>)}
			</div>
		</div>
	)
}

export {
	SubcategoryBadge,
	SubcategoryBadgePopupContent,
	useSubcategoryType,
}