// @ts-nocheck
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
}
else {
	//Чтобы при hot-reloading не создавались новые экземпляры клиентов
	if (!global.prisma) {
		global.prisma = new PrismaClient()
	}
	prisma = global.prisma
}

export default prisma