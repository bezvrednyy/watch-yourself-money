import {randomUUID} from 'crypto'
import {NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {getBackendErrorText} from '../../../backFrontJoint/backendApi/processPrismaError'
import {sendJsonTextError} from '../../../backFrontJoint/backendApi/sendJsonTextError'
import {CreateCategoryRequest} from '../../../backFrontJoint/common/contracts/categories/createCategoryContract'
import prisma from '../../../prisma/prisma'
import {right} from '@sweet-monads/either'

export default async function createCategory(req: CreateCategoryRequest, res: NextApiResponse) {
	const session = await getSession({ req })
	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
		return
	}

	const userId = session.user.id
	const {subcategories, ...mainCategory} = req.body.data

	try {
		await prisma.category.createMany({data: [
			{
				id: mainCategory.id,
				name: mainCategory.title,
				iconId: mainCategory.iconId,
				color: mainCategory.colorId,
				type: mainCategory.type,
				userId,
			},
			...subcategories.map(x => ({
				id: randomUUID(),
				name: x.title,
				iconId: x.iconId,
				color: x.colorId,
				type: x.type,
				userId,
				parentCategoryId: x.parentCategoryId,
			})),
		]})
		res.status(200).send(right(undefined))
	}
	catch (error) {
		sendJsonTextError(res, 500, getBackendErrorText(error))
	}
}