import {PrismaAdapter} from '@next-auth/prisma-adapter'
import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import GithubProvider from 'next-auth/providers/github'
import {getEnvType} from '../../../environment/environment'
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
			await Promise.all([
				prisma.category.create({
					data: {userId: user.id, name: 'Food', color: 'green#300', iconId: 'outline-cake', type: 'EXPENSES'},
				}),
				prisma.userSettings.create({
					data: {userId: user.id, languageId: 'RUSSIAN', currencyId: 'RUBLE', theme: 'DEFAULT'},
				}),
				prisma.bankAccount.create({
					data: {userId: user.id, name: 'Сash', description: 'my love cash', color: 'green#300', iconId: 'outline-cash'},
				}),
			])
		},
	},
})