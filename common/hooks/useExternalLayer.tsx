import {HTMLElement} from 'node-html-parser'

type UseExternalLayerParams = {
	layer: HTMLElement,
	createJSX: () => JSX.Element|null,
	show: boolean,
	appearAnimation?: (x: HTMLElement) => Promise<unknown>,
	hideAnimation?: (x: HTMLElement) => Promise<unknown>,
}

function useExternalLayer({
	layer,
	createJSX,
	show,
}: UseExternalLayerParams) {
	//TODO
}

export {
	useExternalLayer,
}
