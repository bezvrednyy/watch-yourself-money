class Logger {
	static error(message?: string) {
		console.error(message || 'Logger catch error')
	}
}

export {
	Logger,
}