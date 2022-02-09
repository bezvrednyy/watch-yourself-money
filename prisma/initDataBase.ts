import prisma from './prisma'

export async function initDataBase() {
	await Promise.all([
		prisma.currency.createMany({ data: [
			{id: 'RUBLE', name: 'Ruble'},
			{id: 'DOLLAR', name: 'Dollar'},
		]}),
		prisma.language.createMany({ data: [
			{id: 'RUSSIAN', name: 'Russian'},
			{id: 'ENGLISH', name: 'English'},
		]}),
	])
}