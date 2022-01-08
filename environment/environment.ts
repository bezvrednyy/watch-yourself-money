type EnvironmentType = 'test'|'development'|'production'

export default interface Session {
	userId: string,
}

function getEnvType(): EnvironmentType {
	return process.env.NODE_ENV
}

function useInitEnvironment() {
	console.log('hello env')
	//TODO
}

export {
	useInitEnvironment,
	getEnvType,
}