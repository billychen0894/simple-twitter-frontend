import styles from 'admin/AdminHeader/AdminHeader.module.scss';

function AdminHeader(adminMain, adminUser, label) {
  if (adminMain) {
    return (
      <div className={styles.adminHeader}>
        <h2 className={styles.headerTitle}>{label}</h2>
      </div>
    );
  }
  if (adminUser) {
    return (
      <div className={styles.adminHeader}>
        <h2 className={styles.headerTitle}>{label}</h2>
      </div>
    );
  }
  // return (
  //   <div className={styles.adminHeader}>
  //     <h2 className={styles.headerTitle}>{label}</h2>
  //   </div>
  // );
}
export default AdminHeader;
