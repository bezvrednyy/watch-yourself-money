import {CheckIcon} from '@heroicons/react/outline'
import {ColorId, getDefaultColorIds} from '../../../../../common/colors/colors'
import {getColorById} from '../../../../../common/colors/theme'
import {PopoverDefault} from '../../../../../uikit/popovers/PopoverDefault'
import {ButtonWithPopover} from '../../../../../uikit/button/buttons/buttonWithPopover/ButtonWithPopover'
import {Tab} from '@headlessui/react'
import {joinStrings} from '../../../../../common/string'
import {RoundedSquare} from '../../../../../uikit/RoundedSquare'
import {
	OutlineIconId,
	getDefaultIconIds,
	getOutlineIconById,
} from '../../../../../uikit/icons/getOutlineIconById'

type CategoryViewPickerProps = {
	iconId: OutlineIconId,
	colorId: ColorId,
	onSelectIcon: (id: OutlineIconId) => void,
	onSelectColor: (id: ColorId) => void,
}

export function CategoryViewPicker(props: CategoryViewPickerProps) {
	const IconFC = getOutlineIconById(props.iconId)

	return <ButtonWithPopover
		createButton={() => <RoundedSquare
			createIcon={() => <IconFC className='m-1 w-7 h-7 overflow-hidden' />}
			bgHexColor={getColorById(props.colorId)}
			className='transform transition hover:scale-105 cursor-pointer shadow'
		/>}
		createPopover={() => <PopoverDefault
			createContent={() => <PopoverContent {...props} />}
		/>}
	/>
}

function PopoverContent({
	iconId,
	colorId,
	onSelectIcon,
	onSelectColor,
}: CategoryViewPickerProps) {
	const tabs = ['Icon', 'Color']
	return (
		<div className='w-44'>
			<Tab.Group>
				<Tab.List className='flex space-x-4 p-1'>
					{tabs.map(category => (
						<Tab key={category} className={({selected}) =>
							joinStrings(
								'w-full text-base font-medium text-purple-600 border-b-2 border-purple-600 border-opacity-0',
								'px-4 py-1 cursor-pointer duration-300',
								selected ? 'border-opacity-100' : 'hover:border-opacity-50',
							)}
						>
							{category}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels>
					<IconSelections selected={iconId} onSelect={onSelectIcon} />
					<ColorSelections selected={colorId} onSelect={onSelectColor} />
				</Tab.Panels>
			</Tab.Group>
		</div>
	)
}

type SelectionsProps<T> = {
	selected: T,
	onSelect: (id: T) => void,
}

function IconSelections({
	selected,
	onSelect,
}: SelectionsProps<OutlineIconId>) {
	const iconIds = getDefaultIconIds()
	return (
		<Tab.Panel className={getPanelClassName()}>
			{iconIds.map(id => <RoundedSquare
				key={id}
				bgHexColor={getColorById('white')}
				className={joinStrings(
					'transform transition hover:scale-105 cursor-pointer w-7 h-7 mb-1',
					selected === id ? 'border-2 border-purple-600 rounded-full' : null,
				)}
				rounded='full'
				createIcon={() => {
					const IconFC = getOutlineIconById(id)
					return <IconFC className='w-6 h-6 text-black shadow-none' />
				}}
				onClick={() => onSelect(id)}
			/>)}
		</Tab.Panel>
	)
}

function ColorSelections({
	selected,
	onSelect,
}: SelectionsProps<ColorId>) {
	const colorIds = getDefaultColorIds()
	return (
		<Tab.Panel className={getPanelClassName()}>
			{colorIds.map(id => <RoundedSquare
				key={id}
				bgHexColor={getColorById(id)}
				className='transform transition hover:scale-105 cursor-pointer w-7 h-7 mb-1'
				rounded='full'
				createIcon={selected === id
					? () => <CheckIcon className='w-6 h-6 text-white shadow-none' />
					: undefined
				}
				onClick={() => onSelect(id)}
			/>)}
		</Tab.Panel>
	)
}

function getPanelClassName(): string {
	return 'flex justify-between flex-wrap max-h-64 overflow-y-scroll pt-1 pr-1 relative left-1 scrollbar'
}