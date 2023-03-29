import AdminUserCardItem from 'admin/AdminUserCard/AdminUserCardItem';
// import Card from 'shared/components/UIElements/Card';
import styles from 'admin/AdminUserCard/AdminUserCardList.module.scss';

function AdminUserCardList() {
  return (
    <div className={styles.AdminCards}>
      <div className={styles.adminCardListContainer}>
        <h2>使用者列表</h2>
        <hr />
        <div className={styles.cardContainer}>
          <AdminUserCardItem className={styles.cardItem} />
          <AdminUserCardItem className={styles.cardItem} />
          <AdminUserCardItem className={styles.cardItem} />
          <AdminUserCardItem className={styles.cardItem} />
          <AdminUserCardItem className={styles.cardItem} />
          <AdminUserCardItem className={styles.cardItem} />
        </div>
      </div>
    </div>
  );
}
export default AdminUserCardList;
