import styles from "./carousel.module.css";

export const NextPrevButton = ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className={styles.button}
		>
			{children}
		</button>
	);
};