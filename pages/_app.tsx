import {createStore} from '@reatom/core'
import {reatomContext} from '@reatom/react'
import {AppProps} from 'next/app'
import 'tailwindcss/tailwind.css'
import '../public/styles.css'
import {useEffect} from 'react'
import {useInitEnvironment} from '../environment/environment'
import {SessionProvider} from 'next-auth/react'

export default function MyApp({
	Component,
	pageProps: {session, ...pageProps},
}: AppProps) {
	useInitEnvironment()
	useEffect(() => {
		const rootElement = document.getElementById('__next')
		rootElement && rootElement.classList.add('h-full') //tailwind-css
	}, [])

	const store = createStore()
	return <>
		<SessionProvider session={session}>
			<reatomContext.Provider value={store}>
				<Component {...pageProps} />
			</reatomContext.Provider>
		</SessionProvider>
	</>
}