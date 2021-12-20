import {PopoverDefault} from '../../../../../../components/popovers/PopoverDefault'
import {ButtonWithPopover} from '../../../../../../components/button/buttons/buttonWithPopover/ButtonWithPopover'
import {Tab} from '@headlessui/react'
import {joinClassNames} from '../../../../../../common/joinClassNames'
import {RoundedSquare} from '../../../../../../components/RoundedSquare'
import {useAtom} from '@reatom/react'
import {editCategoryPopupAtoms} from '../model/editableCategoryAtom'
import {getOutlineIconById} from '../../../../../../components/icons/getOutlineIconById'

export function CategoryViewPicker() {
	const [selectedIcon] = useAtom(editCategoryPopupAtoms.iconIdAtom)
	const [selectedColor] = useAtom(editCategoryPopupAtoms.colorAtom)
	const IconFC = getOutlineIconById(selectedIcon)

	return <ButtonWithPopover
		createButton={() => <RoundedSquare
			createIcon={() => <IconFC className='m-1 w-7 h-7 overflow-hidden' />}
			bgHexColor={selectedColor}
			className='transform transition hover:scale-105 cursor-pointer'
		/>}
		createPopover={() => <PopoverDefault
			createContent={() => <PopoverContent/>}
		/>}
	/>
}

function PickerButton() {
	return (
		<button>

		</button>
	)
}

function PopoverContent() {
	const tabs = ['Icon', 'Color']
	return (
		<>
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
					<Tab.Panel>
						<ColorSelections/>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</>
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
	return (
		<>
			Colors
		</>
	)
}