import {Store} from '@reatom/core'
import {declareAsyncAction} from '../declareAsyncAction'
import {userSettingsAtom} from './userSettingsAtom'

type EnvironmentType = 'test'|'development'|'production'

function getEnvType(): EnvironmentType {
	return process.env.NODE_ENV
}

const initUserSettings = declareAsyncAction(async store => {
	const settingsRes = await fetch('http://localhost:3000/api/env/get_user_settings')
	if (settingsRes.ok) {
		const { settings } = await settingsRes.json()
		store.dispatch(userSettingsAtom.set(
			settings,
		))
	}
})

function initEnvironment(store: Store) {
	initUserSettings(store)
}

export {
	initEnvironment,
	getEnvType,
}