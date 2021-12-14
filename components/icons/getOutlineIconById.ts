import {
	ShoppingBagIcon,
	GiftIcon,
	CloudIcon,
	TranslateIcon,
	UserGroupIcon,
	PuzzleIcon,
	RefreshIcon,
} from '@heroicons/react/outline'
import * as React from 'react'
import {checkNever} from '../../common/checkNever'

export type OutlineIconId = 'outline-gift'|
	'outline-shopping-bag'|
	'outline-cloud'|
	'outline-translate'|
	'outline-user-group'|
	'outline-puzzle'|
	'outline-refresh'

export function getOutlineIconById(id: OutlineIconId): React.FC<React.ComponentProps<'svg'>> {
	switch (id) {
		case 'outline-gift':
			return GiftIcon
		case 'outline-shopping-bag':
			return ShoppingBagIcon
		case 'outline-cloud':
			return CloudIcon
		case 'outline-translate':
			return TranslateIcon
		case 'outline-user-group':
			return UserGroupIcon
		case 'outline-puzzle':
			return PuzzleIcon
		case 'outline-refresh':
			return RefreshIcon
		default:
			checkNever(id, `Unknown icon id: ${id}`)
			throw new Error()
	}
}