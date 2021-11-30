import {Logger} from './Logger'

function verify<T>(condition: (T|null|undefined), message: string): T {
	Logger.assert(condition, message)
	return <T>condition
}

export {
	verify,
}