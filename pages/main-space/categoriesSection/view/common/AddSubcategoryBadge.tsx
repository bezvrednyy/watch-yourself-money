import {useState} from 'react'
import {joinStrings} from '../../../../../common/utils/string'
import {Badge} from '../../../../../uikit/Badge'
import {Button} from '../../../../../uikit/button/Button'
import {OutlineIconId, getOutlineIconById} from '../../../../../uikit/icons/getOutlineIconById'
import {PopupDefault} from '../../../../../uikit/PopupDefault'
import styles from './common.module.css'
import {SubcategoryBadgePopupContent} from './SubcategoryBadgePopupContent'

type OnSaveParams = {
	title: string,
	iconId: OutlineIconId,
}

type AddSubcategoryBadgeButtonProps = {
	onSave: (params: OnSaveParams) => void,
}

export function AddSubcategoryBadge({
	onSave,
}: AddSubcategoryBadgeButtonProps) {
	const [show, setShow] = useState(false)
	const [iconId, setIconId] = useState<OutlineIconId>('outline-bookmark')
	const [title, setTitle] = useState('')

	return <>
		<Badge
			label='Add'
			className={joinStrings(
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
			buttons={[
				<Button
					key='add'
					style='blue-default'
					onClick={() => {
						if (title === '') {
							return
						}
						onSave({
							title,
							iconId,
						})
						setShow(false)
					}}
					structure='text'
					text='Add'
				/>,
				<Button
					key='cancel'
					style='secondary'
					onClick={() => setShow(false)}
					structure='text'
					text='Cancel'
				/>,
			]}
		/>
	</>
}