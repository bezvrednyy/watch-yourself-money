import {UserSettings} from '@prisma/client'
import {TextErrorResponse} from '../../errors'

type GetUserSettingsContractRequestData = void

export type GetUserSettingsContractRightData = UserSettings
export type GetUserSettingsContractLeftData = TextErrorResponse