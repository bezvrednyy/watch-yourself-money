import {useAction} from '@reatom/react'
import {useState} from 'react'
import {getColorById} from '../../../../../../common/colors/theme'
import {joinClassNames} from '../../../../../../common/joinClassNames'
import {Badge} from '../../../../../../components/Badge'
import {Button} from '../../../../../../components/button/Button'
import {
	OutlineIconId,
	getDefaultIconIds,
	getOutlineIconById,
} from '../../../../../../components/icons/getOutlineIconById'
import {PopupDefault} from '../../../../../../components/PopupDefault'
import {RoundedSquare} from '../../../../../../components/RoundedSquare'
import {TextField} from '../../../../../../components/TextField'
import {CategoryData} from '../../../model/categoriesAtom'
import {editCategoryPopupAtoms} from '../model/editableCategoryAtom'
import styles from './SubcategoryBadge.module.css'

export function SubcategoryBadge(props: CategoryData) {
	const {
		title: initTitle,
		iconId: initIconId,
	} = props
	const [show, setShow] = useState(false)
	const [iconId, setIconId] = useState(initIconId)
	const [title, setTitle] = useState(initTitle)
	const handleUpdateSubcategory = useAction(editCategoryPopupAtoms.subcategoriesAtom.updateSubcategory)
	const handleAddEditedSubcategoryId = useAction(editCategoryPopupAtoms.editedSubcategoryIdsSetAtom.add)
	return <>
		<Badge
			label={initTitle}
			className={joinClassNames(
				'bg-purple-300 rounded-full mr-1 mt-2',
				styles.badge,
			)}
			createIcon={() => {
				const IconFC = getOutlineIconById(initIconId)
				return <IconFC className='w-5 h-5' />
			}}
			onClick={() => setShow(true)}
			cornerType='rounded'
		/>
		<PopupDefault
			show={show}
			createContent={() => <PopupContent
				iconId={iconId}
				setIconId={setIconId}
				title={title}
				setTitle={setTitle}
			/>}
			buttons={[
				<Button
					key={'close'}
					style='blue-default'
					onClick={() => {
						handleUpdateSubcategory({
							...props,
							iconId,
							title,
						})
						handleAddEditedSubcategoryId(props.id)
						setShow(false)
					}}
					structure='text'
					text='Save'
				/>,
			]}
		/>
	</>
}

type PopoverContentProps = {
	iconId: OutlineIconId,
	setIconId: (v: OutlineIconId) => void,
	title: string,
	setTitle: (v: string) => void,
}

function PopupContent({
	iconId,
	setIconId,
	title,
	setTitle,
}: PopoverContentProps) {
	return (
		<div className='w-60'>
			<TextField
				value={title}
				onInput={setTitle}
				placeholder={'Category name'}
				required={true}
			/>
			<div className='flex justify-between flex-wrap max-h-44 overflow-y-scroll mt-4 pr-1 relative left-1 scrollbar'>
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