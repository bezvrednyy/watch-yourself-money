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
})