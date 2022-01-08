import {UserSettings} from '@prisma/client'
import {createPrimitiveAtom} from '@reatom/core/primitives'

const userSettingsAtom = createPrimitiveAtom<UserSettings>({} as UserSettings)

export {
	userSettingsAtom,
}