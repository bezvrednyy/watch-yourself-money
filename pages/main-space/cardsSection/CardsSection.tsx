import {useAction, useAtom} from '@reatom/react'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {selectedPeriodAtom} from '../model/selectedPeriodAtom'
import styles from './CardsSection.module.css'
import {joinStrings} from '../../../common/utils/string'
import {BankCard} from '../../../commonClient/uikit/bankCard/BankCard'
import {DatePicker} from '../../../commonClient/uikit/datePicker/DatePicker'

function CardsSection() {
	const [selectedPeriod] = useAtom(selectedPeriodAtom)
	const [cards] = useAtom(bankAccountsAtom)
	const handleSetStartDate = useAction(selectedPeriodAtom.setStartDate)
	const handleSetEndDate = useAction(selectedPeriodAtom.setEndDate)

	return (
		<div className='flex flex-col w-96 bg-green-100'>
			<div className='flex justify-center items-center'>
				<DatePicker
					date={selectedPeriod.startDate}
					onSelectedChanged={handleSetStartDate}
					className={joinStrings(
						'my-4',
						styles['date-picker'],
					)}
					inputClass='bg-transparent'
				/>
				{'—'}
				<DatePicker
					date={selectedPeriod.endDate}
					onSelectedChanged={handleSetEndDate}
					className={joinStrings(
						'my-4',
						styles['date-picker'],
					)}
					inputClass='bg-transparent'
				/>
			</div>
			<div className={joinStrings('flex flex-col space-y-4 overflow-auto items-center', styles['cards-section'])}>
				{cards.map(card => <BankCard key={card.id} {...card} />)}
			</div>
		</div>)
}

export {
	CardsSection,
}