import {joinStrings} from '../../../../common/utils/string'
import styles from './Preloader.module.css'

type PreloaderProps = {
	className?: string,
}

export function Preloader({
	className,
}: PreloaderProps) {
	return <div className={joinStrings(styles.preloader, className || 'w-[22px] h-[22px]')}>
		<div className={styles.loader}></div>
	</div>
}