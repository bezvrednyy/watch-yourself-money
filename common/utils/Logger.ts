class Logger {
	static error(message?: string) {
		console.error(message || 'Logger catch error')
	}

	static assert(condition: unknown, message = 'Assertion failed') {
		!condition && Logger.error(message)
	}
}

export {
	Logger,
}