type EnvironmentType = 'test'|'development'|'production'

function getEnvType(): EnvironmentType {
	return process.env.NODE_ENV
}

function initEnvironment() {
	//TODO
}

export {
	initEnvironment,
	getEnvType,
}