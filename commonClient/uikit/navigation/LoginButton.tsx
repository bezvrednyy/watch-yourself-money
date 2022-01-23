import {signIn} from 'next-auth/react'
import {joinStrings} from '../../../common/utils/string'

function LoginButton() {
	return <div className='flex space-x-3'>
		<button
			className={joinStrings(
				'p-1 border-b-2 border-purple-600 border-opacity-0 cursor-pointer',
				'text-xl text-gray-800 hover:border-opacity-100 hover:text-purple-600 duration-200',
			)}
			onClick={() => signIn()}
		>
			Login
		</button>
	</div>
}

export {
	LoginButton,
}