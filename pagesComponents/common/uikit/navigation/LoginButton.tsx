import {signIn, signOut, useSession} from 'next-auth/react'
import {joinStrings} from '../../../../common/utils/string'

function AuthButtons() {
	const {data: session} = useSession()
	const buttonComponent = session
		? <Button text='Log out' onClick={() => signOut()}/>
		: <Button text='Login' onClick={() => signIn()}/>

	return <div className='flex space-x-3'>
		{buttonComponent}
	</div>
}

type ButtonProps = {
	text: string,
	onClick: () => void,
}

function Button({
	text,
	onClick,
}: ButtonProps) {
	return (
		<button
			className={joinStrings(
				'p-1 border-b-2 border-purple-600 border-opacity-0 cursor-pointer',
				'text-xl text-gray-800 hover:border-opacity-100 hover:text-purple-600 duration-200',
			)}
			onClick={onClick}
		>
			{text}
		</button>
	)
}

export {
	AuthButtons,
}