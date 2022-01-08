import {useAtom} from '@reatom/react'
import {useState} from 'react'
import {joinClassNames} from '../../../../../common/joinClassNames'
import {TextField} from '../../../../../components/textField/TextField'
import {userSettingsAtom} from '../../../../../environment/userSettingsAtom'
import styles from './AddTransactionPanel.module.css'

export function AddTransactionPanel() {
	const [sum, setSum] = useState('')
	const [userSettings] = useAtom(userSettingsAtom)

	return <div>
		<div className='flex items-center'>
			<div>Category</div>
			<TextField
				style='link'
				value={sum}
				onInput={value => setSum(value)}
				placeholder='100R'
				required={true}
				inputType='number'
				inputClass={joinClassNames(
					'w-40',
					styles.sum,
				)}
			/>
		</div>
	</div>
}