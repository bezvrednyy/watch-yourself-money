import {createStore} from '@reatom/core'
import {reatomContext} from '@reatom/react'
import {AppProps} from 'next/app'
import 'tailwindcss/tailwind.css'
import {useEffect} from 'react'
import {initEnvironment} from '../prisma/environment'
import {UserProvider} from '@auth0/nextjs-auth0'

export default function MyApp({
	Component,
	pageProps,
}: AppProps) {
	initEnvironment()
	useEffect(() => {
		const rootElement = document.getElementById('__next')
		rootElement && rootElement.classList.add('h-full') //tailwind-css
	}, [])

	const {user} = pageProps
	const store = createStore()
	return <>
		<UserProvider user={user} loginUrl='/api/auth/login'>
			<reatomContext.Provider value={store}>
				<Component {...pageProps} />
			</reatomContext.Provider>
		</UserProvider>
	</>
}