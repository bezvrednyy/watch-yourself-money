import {useAction, useAtom} from '@reatom/react'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {selectedPeriodAtom} from '../model/selectedPeriodAtom'
import styles from './CardsSection.module.css'
import {joinClassNames} from '../../../common/joinClassNames'
import {BankCard} from '../../../components/bankCard/BankCard'
import {DatePicker} from '../../../components/datePicker/DatePicker'

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
					className={joinClassNames(
						'my-4',
						styles['date-picker'],
					)}
					inputStyle='string'
				/>
				{'—'}
				<DatePicker
					date={selectedPeriod.endDate}
					onSelectedChanged={handleSetEndDate}
					className={joinClassNames(
						'my-4',
						styles['date-picker'],
					)}
					inputStyle='string'
				/>
			</div>
			<div className={joinClassNames('flex flex-col space-y-4 overflow-auto items-center', styles['cards-section'])}>
				{cards.map(card => <BankCard key={card.id} {...card} />)}
			</div>
		</div>)
}

export {
	CardsSection,
}