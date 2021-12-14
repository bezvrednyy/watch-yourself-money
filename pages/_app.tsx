import {AppProps} from 'next/app'
import 'tailwindcss/tailwind.css'
import {useEffect} from 'react'
import {initEnvironment} from '../prisma/environment'

export default function MyApp({
	Component,
	pageProps,
}: AppProps) {
	initEnvironment()
	useEffect(() => {
		const rootElement = document.getElementById('__next')
		rootElement && rootElement.classList.add('h-full') //tailwind-css
	}, [])
	return <>
		<Component {...pageProps} />
	</>
}