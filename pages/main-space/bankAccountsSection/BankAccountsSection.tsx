import styles from './BankAccountsSection.module.css'
import {useAtom} from '@reatom/react'
import {bankAccountsAtom} from '../model/bankAccountsAtom'
import {joinStrings} from '../../../common/utils/string'
import {AddAccountButton} from './view/addAccountButton/AddAccountButton'
import {BankAccount} from './view/bankAccount/BankAccount'
import {PeriodDatePicker} from './view/PeriodDatePicker'
import {RemoveBankAccountPopup} from './view/bankAccount/RemoveBankAccountPopup'

function BankAccountsSection() {
	const [bankAccounts] = useAtom(bankAccountsAtom)

	return (
		<div className='flex flex-col min-w-[330px] max-w-[350px] bg-green-100'>
			<RemoveBankAccountPopup />
			<div className='flex justify-center items-center'>
				<PeriodDatePicker />
			</div>
			<div className={joinStrings(
				'flex flex-col space-y-4 pb-5 overflow-y-auto items-center px-8',
				styles.section,
			)}>
				<AddAccountButton />
				{bankAccounts.map(bankAccount => <BankAccount key={bankAccount.id} {...bankAccount} canRemove={bankAccounts.length > 1} />)}
			</div>
		</div>)
}

export {
	BankAccountsSection,
}