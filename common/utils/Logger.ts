class Logger {
	static error(message?: string) {
		console.error(message || 'Logger catch error')
	}

	static assert(condition: any, message = 'Assertion failed') {
		!condition && Logger.error(message)
	}
}

export {
	Logger,
}