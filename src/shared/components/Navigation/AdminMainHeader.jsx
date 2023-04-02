import styles from 'shared/components/Navigation/AdminMainHeader.module.scss';

function AdminMainHeader({ children }) {
  return <header className={styles.AdminMainHeader}>{children}</header>;
}

export default AdminMainHeader;
