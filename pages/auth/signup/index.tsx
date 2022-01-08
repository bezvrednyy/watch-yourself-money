import {useState} from 'react'
import {TextField} from '../../../components/textField/TextField'
import {AuthFormHeader} from '../FormHeader'

export default function SignUpPage() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [firstPassword, setFirstPassword] = useState('')
	const [secondPassword, setSecondPassword] = useState('')

	return (
		<>
			<div className='min-h-full flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<AuthFormHeader
						text='Sign up to your account'
						linkInfo={{
							link: '/auth/login',
							text: 'log in',
						}}
					/>
					<form className='mt-8 space-y-6' action='#' method='POST'>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm space-y-4'>
							<TextField
								style='default'
								value={username}
								onInput={value => setUsername(value)}
								placeholder='Username'
								required={true}
							/>
							<TextField
								style='default'
								value={email}
								onInput={value => setEmail(value)}
								placeholder='Email'
								required={true}
								inputType={'email'}
							/>
							<TextField
								style='default'
								value={firstPassword}
								onInput={value => setFirstPassword(value)}
								placeholder='Password'
								required={true}
								inputType={'password'}
							/>
							<TextField
								style='default'
								value={secondPassword}
								onInput={value => setSecondPassword(value)}
								placeholder='Repeat the password'
								required={true}
								inputType={'password'}
							/>
						</div>
					</form>
				</div>
			</div>
		</>)
}