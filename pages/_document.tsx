import Document, {Head, Html, Main, NextScript} from 'next/document'

//Теперь лайауты body можем делать разные. Напр. админка и клиент
export default class MyDocument extends Document {
	render() {
		return (
			<Html className='h-full'>
				<Head>
					<style jsx global>{`
						#__next {
						  height: 100%;
						}
					`}</style>
				</Head>
				<body className='h-full'>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}