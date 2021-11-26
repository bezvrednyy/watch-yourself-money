import Image from 'next/image'

type LogoIconProps = {
	size: number,
}

function LogoIcon({
	size,
}: LogoIconProps) {
	return <Image
		src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
		width={size}
		height={size}
		alt="Workflow"
	/>
}

export {
	LogoIcon,
}