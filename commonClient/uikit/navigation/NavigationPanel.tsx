import {LogoIcon} from '../icons/LogoIcon'
import {AuthButtons} from './LoginButton'

function NavigationPanel() {
	return <nav className='header sticky top-0 bg-white flex items-center justify-between py-4 px-24 shadow-lg shadow-white z-10'>
		<div className='flex align-middle cursor-default'>
			<LogoIcon size={36} />
			<h1 className='text-2xl font-medium ml-2 py-1'>Сервис</h1>
		</div>
		<AuthButtons/>
	</nav>
}

export {
	NavigationPanel,
}