import {MainLayout} from '../../components/MainLayout'
import {CardsSection} from "./cardsSection/CardsSection";
import {CategoriesSection} from "./categoriesSection/CategoriesSection";
import {HistorySection} from './historySection/HistorySection'
import {joinClassNames} from '../../common/joinClassNames'

import styles from './index.module.css'

export default function Index() {
	return (
<MainLayout title={'Home page'} className={joinClassNames('flex', styles.container)}>
	<CardsSection/>
	<CategoriesSection/>
	<HistorySection/>
</MainLayout>)
}