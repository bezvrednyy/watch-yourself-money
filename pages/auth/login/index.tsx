import {useState} from 'react'
import {TextFieldDefault} from '../../../components/textField/TextFieldDefault'
import {AuthFormHeader} from '../FormHeader'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	return (
		<>
			<div className='min-h-full flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8'>
				<div className='max-w-md w-full space-y-8'>
					<AuthFormHeader
						text='Sign in to your account'
						linkInfo={{
							link: '/auth/signup',
							text: 'create new',
						}}
					/>
					<form className='mt-8 space-y-6' action='#' method='POST'>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='rounded-md shadow-sm space-y-4'>
							<TextFieldDefault
								value={email}
								onInput={value => setEmail(value)}
								placeholder='Email'
								required={true}
								type={'email'}
							/>
							<TextFieldDefault
								value={password}
								onInput={value => setPassword(value)}
								placeholder='Password'
								required={true}
								type={'password'}
							/>
						</div>
						<AdditionalSection />
					</form>
				</div>
			</div>
		</>)
}

function AdditionalSection() {
	return (
		<div className='flex items-center justify-between'>
			<div className='flex items-center'>
				<input
					id='remember-me'
					name='remember-me'
					type='checkbox'
					className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded'
				/>
				<label htmlFor='remember-me' className='ml-2 block text-sm text-gray-900'>
			Remember me
				</label>
			</div>

			<div className='text-sm'>
				<a href='#' className='font-medium text-indigo-600 hover:text-indigo-500'>
			Forgot your password?
				</a>
			</div>
		</div>)
}