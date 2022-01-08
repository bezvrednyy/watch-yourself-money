import {CurrencyId, UserSettings} from '@prisma/client'
import {createPrimitiveAtom} from '@reatom/core/primitives'
import {checkNever} from '../common/checkNever'

function getCurrencySymbolById(id: CurrencyId): string {
	switch (id) {
		case 'DOLLAR':
			return '$'
		case 'RUBLE':
			return '₽'
		default:
			checkNever(id, `Unknown currency id: ${id}`)
			return ''
	}
}

const userSettingsAtom = createPrimitiveAtom<UserSettings>({} as UserSettings)

export {
	userSettingsAtom,
	getCurrencySymbolById,
}