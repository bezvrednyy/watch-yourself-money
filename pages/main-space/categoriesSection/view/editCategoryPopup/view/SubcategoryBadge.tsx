import {joinClassNames} from '../../../../../../common/joinClassNames'
import {Badge} from '../../../../../../components/Badge'
import {ButtonWithPopover} from '../../../../../../components/button/buttons/buttonWithPopover/ButtonWithPopover'
import {OutlineIconId, getOutlineIconById} from '../../../../../../components/icons/getOutlineIconById'
import {PopoverDefault} from '../../../../../../components/popovers/PopoverDefault'
import {TextField} from '../../../../../../components/TextField'
import styles from './SubcategoryBadge.module.css'

type SubcategoryBadgeProps = {
	title: string,
	iconId: OutlineIconId,
}

export function SubcategoryBadge({
	title,
	iconId,
}: SubcategoryBadgeProps) {
	return <ButtonWithPopover
		createButton={() => <Badge
			label={title}
			className={joinClassNames(
				'bg-purple-300 rounded-full mr-1 mt-2',
				styles.badge,
			)}
			createIcon={() => {
				const IconFC = getOutlineIconById(iconId)
				return <IconFC className='w-5 h-5' />
			}}
			onClick={() => console.log('Open popup or popover')}
			cornerType='rounded'
		/>}
		createPopover={() => <PopoverDefault
			createContent={() => <PopoverContent/>}
		/>}
	/>
}

function PopoverContent() {
	return (
		<div className='w-44'>
			<TextField
				value={''}
				onInput={() => {}}
				placeholder={'Category name'}
				required={true}
			/>

		</div>
	)
}