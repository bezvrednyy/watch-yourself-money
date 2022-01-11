import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {sendJsonTextError} from '../../../backFrontJoint/backendApi/sendJsonTextError'
import prisma from '../../../prisma/prisma'

export default async function getUserSettings(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })

	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}

	const settings = await prisma.userSettings.findFirst({where: {
		userId: session?.user.id,
	}})

	if (settings) {
		res.json({ settings })
		return
	}
	sendJsonTextError(res, 500, 'Error: user settings not found!')
}