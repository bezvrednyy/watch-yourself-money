import {UserSettings} from '@prisma/client'
import {TextErrorResponse, TypeErrorResponse} from '../../errors'

type GetUserSettingsContractRequestData = void
export type GetUserSettingsErrorType = 'USER_SETTINGS_NOT_FOUND'

export type GetUserSettingsContractRightData = UserSettings
export type GetUserSettingsContractLeftData = TypeErrorResponse<GetUserSettingsErrorType> | TextErrorResponse