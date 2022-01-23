import {UserSettings} from '@prisma/client'
import {StandardError} from '../../errors'

export type GetUserSettingsContractRightData = UserSettings
export type GetUserSettingsContractLeftData = StandardError