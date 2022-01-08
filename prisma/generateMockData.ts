import {Category} from '@prisma/client'
import {randomUUID} from 'crypto'
import {generateRandomInt} from '../common/generateRandom'
import {CategoryData} from '../pages/main-space/categoriesSection/model/categoriesAtom'
import prisma from './prisma'

async function generateMockData() {
	const userId = randomUUID()
	const currencyId = randomUUID()
	const languageId = randomUUID()
	const bankAccountId = randomUUID()
	const categoryId = randomUUID()

	await prisma.user.create({
		data: {id: userId, email: 'algaev18@gmail.com'},
	})

	await prisma.currency.createMany({data: [
		{id: currencyId, name: 'Рубль'},
		{id: randomUUID(), name: 'Доллар'},
	]})
	await prisma.language.createMany({data: [
		{id: languageId, name: 'Русский'},
		{id: randomUUID(), name: 'Английский'},
	]})

	await prisma.userSettings.create({
		data: {userId, currencyId, languageId, theme: 'DEFAULT'},
	})

	await prisma.bankAccount.createMany({data: [
		{id: bankAccountId, userId, iconId: 'outline-gift', name: 'Сбербанк', description: '#Основная карта', color: 'green#500'},
		{id: randomUUID(), userId, iconId: 'outline-gift', name: 'Сбербанк', description: '#Основная карта', color: 'green#500'},
	]})

	const fiveCategories: Array<Category> = [
		{id: categoryId, userId, name: 'Подарки', iconId: 'outline-gift', type: 'EXPENSES', color: 'green#500', parentCategoryId: null},
		{id: randomUUID(), userId, name: 'Развлечения', iconId: 'outline-puzzle', type: 'EXPENSES', color: 'cyan#500', parentCategoryId: null},
		{id: randomUUID(), userId, name: 'Общественные дела', iconId: 'outline-user-group', type: 'EXPENSES', color: 'blue#500', parentCategoryId: null},
		{id: randomUUID(), userId, name: 'Стройка', iconId: 'outline-user-group', type: 'EXPENSES', color: 'yellow#500', parentCategoryId: categoryId},
		{id: randomUUID(), userId, name: 'Волонтёрство', iconId: 'outline-translate', type: 'INCOMES', color: 'gray#500', parentCategoryId: categoryId},
		{id: randomUUID(), userId, name: 'Раздача еды', iconId: 'outline-cloud', type: 'INCOMES', color: 'blue#500', parentCategoryId: categoryId},
		{id: randomUUID(), userId, name: 'Репетиторство', iconId: 'outline-translate', type: 'INCOMES', color: 'pink#500', parentCategoryId: null},
		{id: randomUUID(), userId, name: 'Сайты', iconId: 'outline-cloud', type: 'INCOMES', color: 'blue#500', parentCategoryId: null},
	]
	await prisma.category.createMany({
		data: fiveCategories,
	})

	await prisma.transaction.createMany({data: [
		{id: randomUUID(), date: new Date(), money: 802, currencyId, bankAccountId, categoryId, comment: 'Весы для тёти Тани'},
		{id: randomUUID(), date: new Date(), money: generateRandomInt(), currencyId, bankAccountId, categoryId},
		{id: randomUUID(), date: new Date(), money: generateRandomInt(), currencyId, bankAccountId, categoryId},
		{id: randomUUID(), date: new Date(), money: generateRandomInt(), currencyId, bankAccountId, categoryId},
		{id: randomUUID(), date: new Date(), money: generateRandomInt(), currencyId, bankAccountId, categoryId},
	]})
}

export {
	generateMockData,
}