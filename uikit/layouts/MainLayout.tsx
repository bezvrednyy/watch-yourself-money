import Head from 'next/head'
import {ReactChild} from 'react'
import {NavigationPanel} from '../navigation/NavigationPanel'

type MainLayoutProps = {
    title: string,
    children: Array<ReactChild>,
    className?: string,
}

function MainLayout({
	children,
	title,
	className,
}: MainLayoutProps) {
	return <>
		<Head>
			<title>{`${title} | Next course`}</title>
			<meta name='keywords' content='ключевые слова'/>
			<meta name='description' content='описание'/>
		</Head>
		<NavigationPanel/>
		<main className={className}>
			{children}
		</main>
	</>
}

export {
	MainLayout,
}