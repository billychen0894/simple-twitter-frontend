import { useState } from 'react';
import AdminNavigation from 'shared/components/Navigation/AdminNavigation';
import styles from 'admin/pages/AdminRootLayout/AdminRootLayout.module.scss'
import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';

function AdminLayout(AdminUserCardList) {
  const [header, setHeader] = useState('推文清單');
  if (AdminUserCardList) {
    return (
      setHeader('使用者列表');
    );
  }
  return (
    <div className="container">
      <AdminNavigation />
      <h2 className={styles.header}>{header}</h2>
      <AdminTweetList />
    </div>
  );
}

export default AdminLayout;
