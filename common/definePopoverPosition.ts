import {checkNever} from './checkNever'

type PopoverSide = 'top'|'bottom'|'left'|'right'
type PopoverAlign = 'start'|'center'|'end'

type Size = {
	width: number,
	height: number,
}

type Coordinates = {
	x: number,
	y: number,
}

type GetPopoverOffsetParams = {
	elementSize?: Size,
	popoverSize: Size,
	side: PopoverSide,
	align: PopoverAlign,
	offsetX?: number,
	offsetY?: number,
}

function definePopoverPosition({
	elementSize = {
		width: 0,
		height: 0,
	},
	popoverSize,
	side,
	align,
	offsetX = 0,
	offsetY = 0,
}: GetPopoverOffsetParams): Coordinates {
	const pos: Coordinates = {
		x: 0,
		y: 0,
	}

	switch (side) {
		case 'top':
			pos.y = -popoverSize.height - offsetY
			break
		case 'bottom':
			pos.y = elementSize.height + offsetY
			break
		case 'left':
			pos.x = -popoverSize.width - offsetX
			break
		case 'right':
			pos.x = elementSize.width + offsetX
			break
		default:
			checkNever(side)
	}

	switch (align) {
		case 'start':
			switch (side) {
				case 'top':
				case 'bottom':
					pos.x = offsetX
					break
				case 'right':
				case 'left':
					pos.y = offsetY
					break
				default:
					checkNever(side)
			}
			break
		case 'center':
			switch (side) {
				case 'top':
				case 'bottom':
					pos.x = (elementSize.width - popoverSize.width) / 2
					break
				case 'right':
				case 'left':
					pos.y = (elementSize.height - popoverSize.height) / 2
					break
				default:
					checkNever(side)
			}
			break
		case 'end':
			switch (side) {
				case 'top':
				case 'bottom':
					pos.x = elementSize.width - popoverSize.width - offsetX
					break
				case 'right':
				case 'left':
					pos.y = elementSize.height - popoverSize.height - offsetY
					break
				default:
					checkNever(side)
			}
			break
		default:
			checkNever(align)
	}

	return pos
}

export {
	definePopoverPosition,
}
