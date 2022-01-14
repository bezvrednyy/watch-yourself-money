import {UserSettings} from '@prisma/client'
import {StandardError} from '../../errors'

type GetUserSettingsContractRequestData = void

export type GetUserSettingsContractRightData = UserSettings
export type GetUserSettingsContractLeftData = StandardError