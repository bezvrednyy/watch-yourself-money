import {Logger} from './Logger'

function checkNever(value: never, msg = `Unhandled value: ${JSON.stringify(value)}`): void {
	return Logger.error(msg)
}

export {
	checkNever,
}