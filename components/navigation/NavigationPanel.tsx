import {AuthButtons} from './AuthButtons'

function NavigationPanel() {
    return <nav className="header sticky top-0 bg-white shadow-md flex items-center justify-between py-2 px-8">
		<h1 className="w-3/12">
			<a className="text-2xl font-medium">
				Сервис
			</a>
		</h1>
		<AuthButtons/>
	</nav>
}

export {
    NavigationPanel,
}