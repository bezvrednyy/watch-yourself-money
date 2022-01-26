import {RefObject, useCallback, useEffect} from 'react'

export function useEventHandler<K extends keyof HTMLElementEventMap, R extends HTMLElement>(
	ref: RefObject<R>,
	type: K,
	listener: (this: HTMLElement, ev: HTMLElementEventMap[K]) => unknown,
) {
	const cb = useCallback(listener, [listener])
	useEffect(() => {
		const element = ref.current
		if (element) {
			element.addEventListener(type, cb)
			return () => element.removeEventListener(type, cb)
		}
	})
}