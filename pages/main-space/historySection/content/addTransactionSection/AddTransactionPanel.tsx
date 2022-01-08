import {useAtom} from '@reatom/react'
import {useState} from 'react'
import {TextField} from '../../../../../components/TextField'
import {userSettingsAtom} from '../../../../../environment/userSettingsAtom'

export function AddTransactionPanel() {
	const [sum, setSum] = useState('')
	const [userSettings] = useAtom(userSettingsAtom)

	return <div>
		<div>Category</div>
		<TextField
			value={sum}
			onInput={value => setSum(value)}
			placeholder='Email'
			required={true}
			type={'number'}
		/>
	</div>
}