import Link from 'next/link'
import {Button} from '../../components/button/Button'
import {LogoIcon} from '../../components/icons/LogoIcon'

export default function LoginPage() {
	return (
<>
	<div className="min-h-full flex items-center justify-center pb-12 px-4 sm:px-6 lg:px-8">
		<div className="max-w-md w-full space-y-8">
			<FormHeader />
			<form className="mt-8 space-y-6" action="#" method="POST">
				<input type="hidden" name="remember" defaultValue="true" />
				<div className="rounded-md shadow-sm -space-y-px">
					<EmailInput />
					<PasswordInput />
				</div>
				<AdditionalSection />
				<Button
					style='primary'
					structure='text'
					text='Sign in'
				/>
			</form>
		</div>
	</div>
</>)
}

function FormHeader() {
	return (
<div className="flex flex-col align-middle">
	<LogoIcon size={64} />
	<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
	<p className="mt-2 text-center text-sm text-gray-600">
		Or{' '}
		<Link href="/signup">
			<a className="font-medium text-indigo-600 hover:text-indigo-500">
				create new
			</a>
		</Link>
	</p>
</div>)
}

function PasswordInput() {
	return (
<div>
	<label htmlFor="password" className="sr-only">
		Password
	</label>
	<input
		id="password"
		name="password"
		type="password"
		autoComplete="current-password"
		required
		className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
		placeholder="Password"
	/>
</div>)
}

function EmailInput() {
	return (
<div>
	<label htmlFor="email-address" className="sr-only">
		Email address
	</label>
	<input
		id="email-address"
		name="email"
		type="email"
		autoComplete="email"
		required
		className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
		placeholder="Email address"
	/>
</div>)
}

function AdditionalSection() {
	return (
<div className="flex items-center justify-between">
	<div className="flex items-center">
		<input
			id="remember-me"
			name="remember-me"
			type="checkbox"
			className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
		/>
		<label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
			Remember me
		</label>
	</div>

	<div className="text-sm">
		<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
			Forgot your password?
		</a>
	</div>
</div>)
}