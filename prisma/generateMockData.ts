import {Category} from '@prisma/client'
import {generateRandomInt} from '../common/generateRandom'
import {CategoryData} from '../pages/main-space/categoriesSection/model/categoriesAtom'
import prisma from './prisma'

async function generateMockData() {
	await prisma.currency.createMany({data: [
		{id: 1, name: 'Рубль'},
		{id: 2, name: 'Доллар'},
	]})
	await prisma.language.createMany({data: [
		{id: 1, name: 'Русский'},
		{id: 2, name: 'Английский'},
	]})
	await prisma.user.createMany({data: [
		{id: 1, name: 'Валера', email: 'bezvrednyy@gmail.com'},
		{id: 2, name: 'Дима', email: 'algaev18@gmail.com'},
	]})
	await prisma.userSettings.createMany({data: [
		{userId: 1, currencyId: 1, languageId: 1, theme: 'DEFAULT'},
		{userId: 2, currencyId: 2, languageId: 2, theme: 'BLACK'},
	]})

	await prisma.bankAccount.createMany({data: [
		{id: 1, userId: 1, iconId: 'outline-gift', name: 'Сбербанк', description: '#Основная карта', color: '#00FF00'},
		{id: 2, userId: 2, iconId: 'outline-gift', name: 'Сбербанк', description: '#Основная карта', color: '#00FF00'},
	]})

	const fiveCategories: Array<Category> = [
		{id: 1, userId: 1, name: 'Подарки', iconId: 'outline-gift', type: 'EXPENSES', color: '#4bef4b', parentCategoryId: null},
		{id: 2, userId: 1, name: 'Развлечения', iconId: 'outline-puzzle', type: 'EXPENSES', color: '#47f1b6', parentCategoryId: null},
		{id: 3, userId: 1, name: 'Общественные дела', iconId: 'outline-user-group', type: 'EXPENSES', color: '#2bdeee', parentCategoryId: null},
		{id: 4, userId: 1, name: 'Стройка', iconId: 'outline-user-group', type: 'EXPENSES', color: '#2bdeee', parentCategoryId: 3},
		{id: 5, userId: 1, name: 'Волонтёрство', iconId: 'outline-translate', type: 'INCOMES', color: '#009dff', parentCategoryId: 3},
		{id: 6, userId: 1, name: 'Раздача еды', iconId: 'outline-cloud', type: 'INCOMES', color: '#3f63ec', parentCategoryId: 3},
		{id: 7, userId: 1, name: 'Репетиторство', iconId: 'outline-translate', type: 'INCOMES', color: '#009dff', parentCategoryId: null},
		{id: 8, userId: 1, name: 'Сайты', iconId: 'outline-cloud', type: 'INCOMES', color: '#3f63ec', parentCategoryId: null},
	]
	await prisma.category.createMany({data: fiveCategories.concat(
		fiveCategories.map(x => ({...x, id: x.id + fiveCategories.length, userId: 2})),
	)})

	await prisma.transaction.createMany({data: [
		{id: 1, date: new Date(), money: 802, currencyId: 1, bankAccountId: 1, categoryId: 1, comment: 'Весы для тёти Тани'},
		{id: 2, date: new Date(), money: generateRandomInt(), currencyId: 1, bankAccountId: 1, categoryId: 1},
		{id: 3, date: new Date(), money: generateRandomInt(), currencyId: 1, bankAccountId: 1, categoryId: 1},
		{id: 4, date: new Date(), money: generateRandomInt(), currencyId: 1, bankAccountId: 1, categoryId: 1},
		{id: 5, date: new Date(), money: generateRandomInt(), currencyId: 1, bankAccountId: 1, categoryId: 1},
	]})
}

export {
	generateMockData,
}