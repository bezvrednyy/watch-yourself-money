import {CheckIcon} from '@heroicons/react/outline'
import {getColorById} from '../../../../../../common/colors/theme'
import {PopoverDefault} from '../../../../../../components/popovers/PopoverDefault'
import {ButtonWithPopover} from '../../../../../../components/button/buttons/buttonWithPopover/ButtonWithPopover'
import {Tab} from '@headlessui/react'
import {joinClassNames} from '../../../../../../common/joinClassNames'
import {RoundedSquare} from '../../../../../../components/RoundedSquare'
import {useAction, useAtom} from '@reatom/react'
import {editCategoryPopupAtoms, getAvailableColorIds} from '../model/editableCategoryAtom'
import {getOutlineIconById} from '../../../../../../components/icons/getOutlineIconById'

export function CategoryViewPicker() {
	const [selectedIcon] = useAtom(editCategoryPopupAtoms.iconIdAtom)
	const [selectedColor] = useAtom(editCategoryPopupAtoms.colorAtom)
	const IconFC = getOutlineIconById(selectedIcon)

	return <ButtonWithPopover
		createButton={() => <RoundedSquare
			createIcon={() => <IconFC className='m-1 w-7 h-7 overflow-hidden' />}
			bgHexColor={selectedColor}
			className='transform transition hover:scale-105 cursor-pointer shadow'
		/>}
		createPopover={() => <PopoverDefault
			createContent={() => <PopoverContent/>}
		/>}
	/>
}

function PopoverContent() {
	const tabs = ['Icon', 'Color']
	return (
		<div className='w-44'>
			<Tab.Group>
				<Tab.List className='flex space-x-4 p-1'>
					{tabs.map(category => (
						<Tab
							key={category}
							className={({selected}) =>
								joinClassNames(
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
					<Tab.Panel>
						<IconSelections/>
					</Tab.Panel>
					<Tab.Panel className='flex justify-between flex-wrap max-h-64 overflow-y-scroll pt-1 pr-1 relative left-1 scrollbar'>
						<ColorSelections/>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	)
}

function IconSelections() {
	return (
		<>
			Icons
		</>
	)
}

function ColorSelections() {
	const colorIds = getAvailableColorIds()
	const [selectedColor] = useAtom(editCategoryPopupAtoms.colorAtom)
	const handleSetColor = useAction(editCategoryPopupAtoms.colorAtom.set)
	return (
		<>
			{colorIds.map(id => <RoundedSquare
				key={id}
				bgHexColor={getColorById(id)}
				className='transform transition hover:scale-105 cursor-pointer w-7 h-7 mb-1'
				rounded='full'
				createIcon={selectedColor === id
					? () => <CheckIcon className='w-6 h-6 text-white shadow-none' />
					: undefined
				}
				onClick={() => handleSetColor(id)}
			/>)}
		</>
	)
}