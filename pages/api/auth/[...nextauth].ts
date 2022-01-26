import {PrismaAdapter} from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GithubProvider from 'next-auth/providers/github'
import {getEnvType} from '../../../commonClient/environment/clientEnv'
import prisma from '../../../prisma/prisma'

export default NextAuth({
	adapter: PrismaAdapter(prisma),
	secret: process.env.SECRET,
	debug: getEnvType() === 'development',
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
		EmailProvider({
			server: {
				host: process.env.SMTP_HOST,
				post: Number(process.env.SMTP_PORT),
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
				from: process.env.SMTP_FROM,
			},
		}),
	],
	callbacks: {
		session: ({session, user}) => {
			session.user = user
			return session
		},
	},
	events: {
		createUser: async ({user}) => {
			//База данных должна быть проинициализирована ВСЕМИ дефолтными данными. Напр: language, currency...
			await Promise.all([
				prisma.category.createMany({
					data: [
						{ userId: user.id, name: 'Food', color: 'teal#300', iconId: 'outline-cake', type: 'EXPENSES' },
						{ userId: user.id, name: 'Shopping', color: 'yellow#300', iconId: 'outline-shopping-bag', type: 'EXPENSES' },
						{ userId: user.id, name: 'Education', color: 'blue#300', iconId: 'outline-book-open', type: 'EXPENSES' },
						{ userId: user.id, name: 'Entertainment', color: 'orange#300', iconId: 'outline-puzzle', type: 'EXPENSES' },
						{ userId: user.id, name: 'Investments', color: 'green#300', iconId: 'outline-cash', type: 'EXPENSES' },
					],
				}),
				prisma.userSettings.create({
					data: { userId: user.id, languageId: 'RUSSIAN', currencyId: 'RUBLE', theme: 'DEFAULT' },
				}),
				prisma.bankAccount.createMany({
					data: [
						{ userId: user.id, name: 'Sber', money: 0 },
						{ userId: user.id, name: 'Tinkof', money: 0 },
						{ userId: user.id, name: 'Сash', money: 0 },
					],
				}),
			])
		},
	},
})