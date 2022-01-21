import {useSession} from 'next-auth/react'
import {LogoIcon} from '../icons/LogoIcon'
import {LoginButton} from './LoginButton'
import {ProfileButton} from './profileButton/ProfileButton'

function NavigationPanel() {
	const {data: session} = useSession()
	const buttonComponent = session
		? <ProfileButton />
		: <LoginButton />

	return <nav className='header sticky top-0 bg-white flex items-center justify-between py-4 px-24'>
		<div className='flex align-middle cursor-default'>
			<LogoIcon size={36} />
			<h1 className='text-2xl font-medium ml-2 py-1'>Сервис</h1>
		</div>
		{buttonComponent}
	</nav>
}

export {
	NavigationPanel,
}