import {CurrencyId, Prisma} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import prisma from '../../../prisma/prisma'

export type AddTransactionRequestData = {
	id: string
	categoryId: string
	bankAccountId: string
	currencyId: CurrencyId
	comment: string|null
	money: number
	date: Date
}

type AddTransactionRequest = NextApiRequest & {
	body: {
		data: AddTransactionRequestData,
	},
}

export default async function AddTransaction(req: AddTransactionRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}

	const data: AddTransactionRequestData = req.body.data
	const categoryInfo = await prisma.category.findFirst({
		where: {
			id: data.categoryId,
		},
		select: {
			userId: true,
		},
	})

	if (!categoryInfo) {
		res.status(500).json({
			text: 'Category not found',
		})
		return
	}

	if (categoryInfo.userId !== session?.user.id) {
		//Когда запрос ушёл от пользователя на добавление транзакции другому пользователю
		res.status(403).json({
			text: 'Not enough rights',
		})
	}

	//TODO: Either вместо исключений
	try {
		await prisma.transaction.create({
			data: {
				id: data.id,
				categoryId: data.categoryId,
				bankAccountId: data.bankAccountId,
				currencyId: data.currencyId,
				comment: data.comment,
				money: new Prisma.Decimal(data.money),
				date: data.date,
			},
		})
		res.status(200).send({})
	}
	catch (error) {
		res.status(500).json({
			text: error,
		})
	}
}