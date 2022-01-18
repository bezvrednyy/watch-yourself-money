import styles from './CardsSectionDatePicker.module.css'
import {useAction, useAtom } from '@reatom/react'
import {useState} from 'react'
import {DateRange, RangeKeyDict} from 'react-date-range'
import {getColorById} from '../../../../common/colors/theme'
import {joinStrings} from '../../../../common/utils/string'
import {verify} from '../../../../common/utils/verify'
import {ButtonWithPopover} from '../../../../commonClient/uikit/button/buttons/buttonWithPopover/ButtonWithPopover'
import {Button} from '../../../../commonClient/uikit/button/Button'
import {DateField} from '../../../../commonClient/uikit/datePicker/DateField'
import {selectedPeriodAtom} from '../../model/selectedPeriodAtom'

export function CardsSectionDatePicker() {
	return (
		<ButtonWithPopover
			className='my-4'
			createButton={() => <PickerButton />}
			createPopover={({closeFn}) => <Popover closeFn={closeFn} />}
		/>
	)
}

function PickerButton() {
	const [selectedPeriod] = useAtom(selectedPeriodAtom)
	return <div className='flex justify-center items-center'>
		<DateField
			date={verify(selectedPeriod.startDate)}
			inputClass={joinStrings('bg-transparent', styles['date-picker'])}
		/>
		{'—'}
		<DateField
			date={verify(selectedPeriod.endDate)}
			inputClass={joinStrings('bg-transparent', styles['date-picker'])}
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