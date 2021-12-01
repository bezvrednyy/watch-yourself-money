import {ShoppingBagIcon} from '@heroicons/react/outline'
import * as React from 'react'
import {checkNever} from '../../common/checkNever'

export type OutlineIconId = 'outline-gift'
	|'outline-shopping-bag'

export function getOutlineIconById(id: OutlineIconId): React.FC<React.ComponentProps<'svg'>> {
	switch (id) {
		case 'outline-gift':
			return ShoppingBagIcon
		case 'outline-shopping-bag':
			return ShoppingBagIcon
		default:
			checkNever(id, `Unknown icon id: ${id}`)
			throw new Error()
	}
}