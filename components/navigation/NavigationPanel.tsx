import Link from 'next/link'
import {LogoIcon} from '../icons/LogoIcon'
import {AuthButtons} from './AuthButtons'

function NavigationPanel() {
    return <nav className="header sticky top-0 bg-white shadow-md flex items-center justify-between py-2 px-8">
		<Link href='/main-space'>
			<a className="flex align-middle">
				<LogoIcon size={36} />
				<h1 className="text-2xl font-medium ml-2 py-1">Сервис</h1>
			</a>
		</Link>
		<AuthButtons/>
	</nav>
}

export {
    NavigationPanel,
}