import {Store} from '@reatom/core'
import {getClientApi, processStandardError} from '../../../backFrontJoint/clientApi/clientApi'
import {declareAloneAction} from '../declareAloneAction'
import {userSettingsAtom} from './userSettingsAtom'

type EnvironmentType = 'test'|'development'|'production'

function getEnvType(): EnvironmentType {
	return process.env.NODE_ENV
}

const initUserSettings = declareAloneAction(async store => {
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