import { useState, useEffect } from 'react';
import styles from 'admin/AdminHeader/AdminHeader.module.scss';

function AdminHeader(adminMain, AdminUser) {
  const [headerTitle, setHeaderTitle] = useState('推文清單');
  useEffect(() => {
    if (adminMain) {
      setHeaderTitle('使用者列表');
    } else if (AdminUser) {
      setHeaderTitle('使用者列表');
    }
  }, [adminMain, AdminUser]);
  return (
    <div className={styles.adminHeader}>
      <h2 className={styles.headerTitle}>{headerTitle}</h2>
    </div>
  );
}
export default AdminHeader;
