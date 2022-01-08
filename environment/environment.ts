import {Store} from '@reatom/core'
import {useEffect} from 'react'
import {declareAsyncAction} from '../common/declareAsyncAction'
import {userSettingsAtom} from './userSettingsAtom'

type EnvironmentType = 'test'|'development'|'production'

export default interface Session {
	userId: string,
}

function getEnvType(): EnvironmentType {
	return process.env.NODE_ENV
}

const initEnv = declareAsyncAction(async store => {
	const settingsRes = await fetch('http://localhost:3000/api/env/get_user_settings')
	if (settingsRes.ok) {
		const settings = await settingsRes.json()
		store.dispatch(userSettingsAtom.set(settings))
	}
})

function useInitEnvironment(store: Store) {
	useEffect(() => {
		initEnv(store)
	}, [store])
	//TODO
}

export {
	useInitEnvironment,
	getEnvType,
}