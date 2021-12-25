
//https://tailwindcss.com/docs/customizing-colors
type ColorName = 'warmGray'|'trueGray'|'gray'|'coolGray'|'blueGray'|'red'|'orange'|'amber'|'yellow'|
	'lime'|'green'|'emerald'|'teal'|'cyan'|'sky'|'blue'|'indigo'|'violet'|'purple'|'fuchsia'|'pink'|'rose'

type ColorsVariation = 50|100|200|300|400|500|600|700|800|900

type MainColors = {
	'black': string
	'white': string
}

type Colors = MainColors & Record<ColorName, {
	[K in ColorsVariation]: string
}>

type ColorDelimiter = '#'
type ColorId = `${ColorName}${ColorDelimiter}${ColorsVariation}`
	|'black'
	|'white'

interface DefaultTheme {
	colors: Colors
}


const colorDelimiter: ColorDelimiter = '#'
const createColorId = (a: ColorName, b: ColorsVariation): ColorId => `${a}${colorDelimiter}${b}`

export type {
	DefaultTheme,
	ColorId,
	ColorName,
	ColorsVariation,
}

export {
	colorDelimiter,
	createColorId,
}