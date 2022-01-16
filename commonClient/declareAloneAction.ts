import {Store} from '@reatom/core'
import {reatomContext} from '@reatom/react'
import {useContext} from 'react'

export function declareAloneAction<P = void, R = void>(cb: (store: Store, payload: P) => R): (store: Store, payload: P) => R {
	return cb
}

export function useAloneAction<P = void, R = void>(cb: (store: Store, payload: P) => R): (payload: P) => R {
	const store = useContext(reatomContext)
	return payload => cb(store, payload)
}