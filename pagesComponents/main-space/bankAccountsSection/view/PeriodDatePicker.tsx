import styles from './PeriodDatePicker.module.css'
import {useAction, useAtom } from '@reatom/react'
import {useState} from 'react'
import {DateRange, RangeKeyDict} from 'react-date-range'
import {getColorById} from '../../../../common/colors/theme'
import {joinStrings} from '../../../../common/utils/string'
import {verify} from '../../../../common/utils/verify'
import {ButtonWithPopover} from '../../../common/uikit/button/buttons/buttonWithPopover/ButtonWithPopover'
import {Button} from '../../../common/uikit/button/Button'
import {DateField} from '../../../common/uikit/datePicker/DateField'
import {selectedPeriodAtom} from '../../model/selectedPeriodAtom'
import {CalendarIcon} from '@heroicons/react/solid'

export function PeriodDatePicker() {
	return (
		<ButtonWithPopover
			className='mb-4 mt-7'
			popoverClass='shadow-lg'
			createButton={() => <PickerButton />}
			createPopover={({closeFn}) => <Popover closeFn={closeFn} />}
		/>
	)
}

function PickerButton() {
	const [selectedPeriod] = useAtom(selectedPeriodAtom)
	const inputClass = joinStrings('text-gray-900 font-medium bg-transparent font-serif', styles['date-field'])

	return <div className='flex justify-center items-center border-b-2 border-purple-200 rounded-lg'>
		<DateField
			date={verify(selectedPeriod.startDate)}
			inputClass={joinStrings(inputClass, 'ml-2')}
		/>
		<CalendarIcon className='w-6 h-6 text-gray-800' />
		<DateField
			date={verify(selectedPeriod.endDate)}
			inputClass={joinStrings(inputClass, 'mr-2')}
		/>
	</div>
}

type PopoverProps = {
	closeFn: () => void,
}

function Popover({
	closeFn,
}: PopoverProps) {
	const [selectedPeriod] = useAtom(selectedPeriodAtom)
	const [range, setRange] = useState<RangeKeyDict>({
		selection: {
			startDate: selectedPeriod.startDate,
			endDate: selectedPeriod.endDate,
			key: 'selection',
		},
	})
	const handleSetSelectedPeriod = useAction(selectedPeriodAtom.set)

	return <>
		<DateRange
			onChange={item => {
				setRange(item)
			}}
			months={1}
			direction='vertical'
			ranges={[range.selection]}
			rangeColors={[getColorById('fuchsia#400')]}
		/>
		<div className='flex justify-end space-x-2 pb-5 px-3 bg-white rounded-b-lg'>
			<Button
				style={'blue-default'}
				onClick={() => {
					handleSetSelectedPeriod({
						startDate: verify(range.selection.startDate),
						endDate: verify(range.selection.endDate),
					})
					closeFn()
				}}
				structure={'text'}
				text={'Save'}
			/>
			<Button
				style={'secondary'}
				onClick={closeFn}
				structure={'text'}
				text={'Cancel'}
			/>
		</div>
	</>
}