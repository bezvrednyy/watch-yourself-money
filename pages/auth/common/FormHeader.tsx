import Link from 'next/link'
import {LogoIcon} from '../../../components/icons/LogoIcon'

type AuthFormHeaderProps = {
	text: string,
	linkInfo: {
		link: string,
		text: string,
	}
}

function AuthFormHeader({
	text,
	linkInfo,
}: AuthFormHeaderProps) {
	return (
<div className="flex flex-col align-middle">
	<LogoIcon size={64} />
	<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">{text}</h2>
	<p className="mt-2 text-center text-sm text-gray-600">
		Or{' '}
		<Link href={linkInfo.link}>
			<a className="font-medium text-indigo-600 hover:text-indigo-500">
				{linkInfo.text}
			</a>
		</Link>
	</p>
</div>)
}

export {
	AuthFormHeader,
}