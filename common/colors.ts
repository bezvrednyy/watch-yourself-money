
//https://tailwindcss.com/docs/customizing-colors
export type ColorGroup = 'slate'|'gray'|'red'|'orange'|'amber'|'yellow'|'lime'|'green'|'emerald'|
	'teal'|'cyan'|'sky'|'blue'|'indigo'|'violet'|'purple'|'fuchsia'|'pink'|'rose'

export type ColorSaturation = '100'|'200'|'300'|'400'|'500'|'600'|'700'|'800'|'900'

export type ColorId = `${ColorGroup}-${ColorSaturation}`
