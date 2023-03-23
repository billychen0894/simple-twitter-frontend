import styles from 'shared/components/Navigation/MainHeader.module.scss';

function MainHeader({ children }) {
  return <header className={styles.mainHeader}>{children}</header>;
}

export default MainHeader;
