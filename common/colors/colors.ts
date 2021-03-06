
//https://tailwindcss.com/docs/customizing-colors
type ColorName = 'warmGray'|'trueGray'|'gray'|'coolGray'|'blueGray'|'red'|'orange'|'amber'|'yellow'|
	'lime'|'green'|'emerald'|'teal'|'cyan'|'sky'|'blue'|'indigo'|'violet'|'purple'|'fuchsia'|'pink'|'rose'

type ColorsVariation = 50|100|200|300|400|500|600|700|800|900

type MainColors = {
	black: string
	white: string
	transparent: string
}

type Colors = MainColors & Record<ColorName, {
	[K in ColorsVariation]: string
}>

type ColorDelimiter = '#'
type ColorId = `${ColorName}${ColorDelimiter}${ColorsVariation}`
	|'black'
	|'white'
	|'transparent'

interface DefaultTheme {
	colors: Colors
}


const colorDelimiter: ColorDelimiter = '#'
const createColorId = (a: ColorName, b: ColorsVariation): ColorId => `${a}${colorDelimiter}${b}`

function getDefaultColorIds(): Array<ColorId> {
	const colorGroups: Array<ColorName> = [
		'gray', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal',
		'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose',
	]
	const colorsSaturation: Array<ColorsVariation> = [
		300, 400, 500, 600, 700,
	]

	return colorGroups.flatMap(group => colorsSaturation.map(x => createColorId(group, x)))
}

export type {
	DefaultTheme,
	ColorId,
	ColorName,
	ColorsVariation,
}

export {
	colorDelimiter,
	createColorId,
	getDefaultColorIds,
}