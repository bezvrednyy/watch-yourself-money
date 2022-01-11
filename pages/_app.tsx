import {createStore} from '@reatom/core'
import {reatomContext} from '@reatom/react'
import {AppProps} from 'next/app'
import 'tailwindcss/tailwind.css'
import '../commonClient/public/styles.css'
import {useEffect} from 'react'
import {Toaster} from 'react-hot-toast'
import {initEnvironment} from '../commonClient/environment/clientEnv'
import {SessionProvider} from 'next-auth/react'

export default function MyApp({
	Component,
	pageProps: {session, ...pageProps},
}: AppProps) {
	const store = createStore()

	initEnvironment(store)
	useEffect(() => {
		const rootElement = document.getElementById('__next')
		rootElement && rootElement.classList.add('h-full') //tailwind-css
	}, [])

	return <>
		<SessionProvider session={session}>
			<reatomContext.Provider value={store}>
				<Component {...pageProps} />
				<Toaster position='bottom-center' />
			</reatomContext.Provider>
		</SessionProvider>
	</>
}