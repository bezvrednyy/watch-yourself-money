import Head from 'next/head'
import Link from 'next/link'
import {ReactChild} from 'react'

type MainLayoutProps = {
    title: string,
    children: Array<ReactChild>,
}

function MainLayout({
    children,
    title,
}: MainLayoutProps) {
    return <>
        <Head>
            <title>{`${title} | Next course`}</title>
            <meta name="keywords" content="ключевые слова"/>
            <meta name="description" content="описание"/>
        </Head>
        <nav>
           <Link href='/'>Home</Link>
           <Link href='/about'>About</Link>
           <Link href='/posts'>Posts</Link>
        </nav>
        <main>
            {children}
        </main>
    </>
}

export {
    MainLayout,
}