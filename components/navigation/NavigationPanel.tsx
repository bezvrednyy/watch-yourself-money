import Link from 'next/link'

function NavigationPanel() {

    return <nav>
        <Link href='/main-space'>Home</Link>
        <Link href='/about'>About</Link>
        <Link href='/posts'>Posts</Link>
    </nav>
}

export {
    NavigationPanel,
}