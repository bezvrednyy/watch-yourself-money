import {useUser} from '@auth0/nextjs-auth0'
import Link from 'next/link'
import {joinClassNames} from '../../common/joinClassNames'

function AuthButtons() {
	const {user} = useUser()

	const button = user
		? <Button text='Log out' link={'/api/auth/logout?returnTo=/api/auth/login'}/>
		: <Button text='Log in' link={'/api/auth/login?returnTo=/main-space'}/>

	return (
		<div className='flex space-x-3'>
			{button}
		</div>
	)
}

type ButtonProps = {
	text: string,
	link: string
}

function Button({
	text,
	link,
}: ButtonProps) {
	return (
		<Link href={link}>
			<a className={joinClassNames(
				'p-1 border-b-2 border-purple-600 border-opacity-0 cursor-pointer',
				'text-xl text-gray-800 hover:border-opacity-100 hover:text-purple-600 duration-200',
			)}>
				{text}
			</a>
		</Link>
	)
}

export {
	AuthButtons,
}