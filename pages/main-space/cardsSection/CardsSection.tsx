import styles from './CardsSection.module.css'
import {useAtom} from '@reatom/react'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {joinStrings} from '../../../common/utils/string'
import {AddAccountButton} from './view/AddAccountButton'
import {BankCard} from './view/BankCard'
import {CardsSectionDatePicker} from './view/CardsSectionDatePicker'

function CardsSection() {
	const [cards] = useAtom(bankAccountsAtom)

	return (
		<div className='flex flex-col w-96 bg-green-100'>
			<div className='flex justify-center items-center'>
				<CardsSectionDatePicker />
			</div>
			<div className={joinStrings(
				'flex flex-col space-y-4 pb-5 overflow-auto items-center px-7',
				styles['cards-section'],
			)}>
				<AddAccountButton />
				{cards.map(card => <BankCard key={card.id} {...card} />)}
			</div>
		</div>)
}

export {
	CardsSection,
}