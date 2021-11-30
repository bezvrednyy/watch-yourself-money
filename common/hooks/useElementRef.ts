import {MutableRefObject, useRef} from 'react'

function useElementRef(): MutableRefObject<HTMLElement> {
	// @ts-ignore
	return useRef<HTMLElement>()
}

export {
	useElementRef,
}