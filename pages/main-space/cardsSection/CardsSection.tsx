import styles from './CardsSection.module.css'
import {useAtom} from '@reatom/react'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {joinStrings} from '../../../common/utils/string'
import {BankCard} from '../../../commonClient/uikit/bankCard/BankCard'
import {CardsSectionDatePicker} from './view/CardsSectionDatePicker'

function CardsSection() {
	const [cards] = useAtom(bankAccountsAtom)

	return (
		<div className='flex flex-col w-96 bg-green-100'>
			<div className='flex justify-center items-center'>
				<CardsSectionDatePicker />
			</div>
			<div className={joinStrings('flex flex-col space-y-4 overflow-auto items-center', styles['cards-section'])}>
				{cards.map(card => <BankCard key={card.id} {...card} />)}
			</div>
		</div>)
}

export {
	CardsSection,
}