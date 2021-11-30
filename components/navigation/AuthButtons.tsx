import Link from 'next/link'

function AuthButtons() {
	return <div className='flex space-x-3'>
		<Button text='Login' link={'/auth/login'}/>
		<Button text='Sign up' link={'/auth/signup'}/>
	</div>
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
			<a className='p-1 border-b-2 border-purple-600 border-opacity-0 cursor-pointer active
				hover:border-opacity-100 hover:text-purple-600 duration-200
				text-xl text-gray-800'
			>
				{text}
			</a>
		</Link>
	)
}

export {
	AuthButtons,
}