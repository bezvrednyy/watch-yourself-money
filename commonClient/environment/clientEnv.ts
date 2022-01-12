import {Store} from '@reatom/core'
import {getClientApi, processStandardError} from '../../backFrontJoint/clientApi/clientApi'
import {declareAsyncAction} from '../declareAsyncAction'
import {userSettingsAtom} from './userSettingsAtom'

type EnvironmentType = 'test'|'development'|'production'

function getEnvType(): EnvironmentType {
	return process.env.NODE_ENV
}

const initUserSettings = declareAsyncAction(async store => {
	const either = await getClientApi().env.getUserSettings()
	either
		.mapRight(settings => {
			store.dispatch(userSettingsAtom.set(
				settings,
			))
		})
		.mapLeft(processStandardError)
})

function initEnvironment(store: Store) {
	initUserSettings(store)
}

export {
	initEnvironment,
	getEnvType,
}