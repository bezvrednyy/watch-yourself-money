import 'tailwindcss/tailwind.css'
import '../pagesComponents/common/public/styles.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {createStore} from '@reatom/core'
import {reatomContext} from '@reatom/react'
import {AppProps} from 'next/app'
import {useEffect} from 'react'
import {Toaster} from 'react-hot-toast'
import {initEnvironment} from '../pagesComponents/common/environment/clientEnv'
import {SessionProvider} from 'next-auth/react'

export default function MyApp({
	Component,
	pageProps: {session, ...pageProps},
}: AppProps) {
	const store = createStore()

	useEffect(() => {
		initEnvironment(store)
		const rootElement = document.getElementById('__next')
		rootElement && rootElement.classList.add('h-full') //tailwind-css
	}, [store])

	const toastBgStyle = {
		background: 'black',
		color: 'white',
	}

	return <>
		<SessionProvider session={session}>
			<reatomContext.Provider value={store}>
				<Component {...pageProps} />
				<Toaster
					position='top-center'
					toastOptions={{
						success: { style: toastBgStyle },
						error: { style: toastBgStyle },
						loading: { style: toastBgStyle },
					}}
				/>
			</reatomContext.Provider>
		</SessionProvider>
	</>
}