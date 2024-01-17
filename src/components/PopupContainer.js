import styles from '@/styles/Popup.module.css'

const PopupContainer = ({ children }) => {
	return (
		<div className={styles.backdrop}>
			<div className={styles.popup}>{children}</div>
		</div>
	)
}

export default PopupContainer
