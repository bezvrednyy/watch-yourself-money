import {NextApiRequest, NextApiResponse} from 'next'
import {getSession} from 'next-auth/react'
import {getBackendErrorText} from '../../../backFrontJoint/backendApi/processBackendError'
import {sendJsonLeftData, sendJsonRightData} from '../../../backFrontJoint/backendApi/sendJsonData'
import {
	GetUserSettingsContractLeftData,
	GetUserSettingsContractRightData,
} from '../../../backFrontJoint/common/contracts/env/getUserSettingsContract'
import prisma from '../../../prisma/prisma'

export default async function getUserSettings(req: NextApiRequest, res: NextApiResponse) {
	const session = await getSession({ req })

	if (!session?.user) {
		res.status(401).redirect('/api/auth/signin')
	}

	try {
		const settings = await prisma.userSettings.findFirst({where: {
			userId: session?.user.id,
		}})

		if (settings) {
			sendJsonRightData<GetUserSettingsContractRightData>(res, settings)
			return
		}
		//TODO:clientApi, нужно отправлять типы ошибок, а на фронте отображать текст
		sendJsonLeftData<GetUserSettingsContractLeftData>(res, 500, { error: 'Error: user settings not found!' })
	}
	catch (error) {
		sendJsonLeftData<GetUserSettingsContractLeftData>(res, 500, { error: getBackendErrorText(error) })
	}
}