import Document, {Html, NextScript, Head, Main} from 'next/document'

//Теперь лайауты body можем делать разные. Напр. админка и клиент
export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>

				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}