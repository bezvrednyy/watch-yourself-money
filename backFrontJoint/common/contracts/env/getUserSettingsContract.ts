import {UserSettings} from '@prisma/client'
import {ServerError} from '../../errors'

type GetUserSettingsContractRequestData = void

export type GetUserSettingsContractRightData = UserSettings
export type GetUserSettingsContractLeftData = ServerError