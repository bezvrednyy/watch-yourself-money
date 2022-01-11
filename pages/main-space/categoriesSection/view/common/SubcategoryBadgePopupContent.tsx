import {getColorById} from '../../../../../common/colors/theme'
import {joinStrings} from '../../../../../common/utils/string'
import {OutlineIconId, getDefaultIconIds, getOutlineIconById} from '../../../../../uikit/icons/getOutlineIconById'
import {RoundedSquare} from '../../../../../uikit/RoundedSquare'
import {TextField} from '../../../../../uikit/textField/TextField'

type SubcategoryBadgePopupContentProps = {
	iconId: OutlineIconId,
	setIconId: (v: OutlineIconId) => void,
	title: string,
	setTitle: (v: string) => void,
}

export function SubcategoryBadgePopupContent({
	iconId,
	setIconId,
	title,
	setTitle,
}: SubcategoryBadgePopupContentProps) {
	return (
		<div className='w-80'>
			<TextField
				style='default'
				value={title}
				onInput={setTitle}
				placeholder='Category name'
				required={true}
			/>
			<div className='flex justify-between flex-wrap max-h-40 overflow-y-scroll mt-4 pr-1 relative left-1 scrollbar'>
				{getDefaultIconIds().map(id => <RoundedSquare
					key={id}
					bgHexColor={getColorById('white')}
					className={joinStrings(
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