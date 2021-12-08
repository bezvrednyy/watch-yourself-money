import {AppProps} from 'next/app'
import 'tailwindcss/tailwind.css'
import {useEffect} from 'react'

export default function MyApp({
	Component,
	pageProps,
}: AppProps) {
	useEffect(() => {
		const rootElement = document.getElementById('__next')
		rootElement && rootElement.classList.add('h-full') //tailwind-css
	}, [])
	return <>
		<Component {...pageProps} />
	</>
}