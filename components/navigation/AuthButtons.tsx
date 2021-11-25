function AuthButtons() {
	return <div className="flex space-x-3">
		<Button text='Login'/>
		<Button text='Sign up'/>
	</div>
}

type ButtonProps = {
	text: string,
	className?: string
}

function Button({
	text,
}: ButtonProps) {
	return <button className="p-1 border-b-2 border-green-500 border-opacity-0 cursor-pointer active
			hover:border-opacity-100 hover:text-green-500 duration-200
			text-xl text-gray-800"
	>
		{text}
	</button>
}

export {
	AuthButtons
}