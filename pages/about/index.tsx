import Router from 'next/router'
import {MainLayout} from '../../components/MainLayout'

export default function Index() {
	return <MainLayout title={'About page'}>
		<h1>About next.js</h1>
		<button onClick={() => {Router.push('/')}}>Go back to home</button>
		<button onClick={() => {Router.push('/posts')}}>Go to posts</button>
	</MainLayout>
}