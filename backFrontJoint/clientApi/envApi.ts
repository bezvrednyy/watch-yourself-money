import { Either } from '@sweet-monads/either'
import {BackendEitherObject, processBackendEither} from '../common/contracts/BackendEitherObject'
import {
	GetUserSettingsContractLeftData,
	GetUserSettingsContractRightData,
} from '../common/contracts/env/getUserSettingsContract'

async function getUserSettings(): Promise<Either<GetUserSettingsContractLeftData, GetUserSettingsContractRightData>> {
	const response = await fetch('/api/env/get_user_settings')
	const eitherObject: BackendEitherObject<GetUserSettingsContractLeftData, GetUserSettingsContractRightData> = await response.json()
	return processBackendEither(eitherObject)
}

export const envClientApi = {
	getUserSettings,
}