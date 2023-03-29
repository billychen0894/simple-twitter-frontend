import AdminUserCardItem from 'admin/AdminUserCard/AdminUserCardItem';
// import Card from 'shared/components/UIElements/Card';
import styles from 'admin/AdminUserCard/AdminUserCardList.module.scss';

function AdminUserCardList() {
  return (
    <div className={styles.AdminCards}>
      <div className={styles.cardContainer}>
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
        <AdminUserCardItem />
      </div>
    </div>
  );
}
export default AdminUserCardList;

// function AdminUserCardList({ AdminUserCardItems, className }) {
//   const adminUserCardList = AdminUserCardItems.map((cardItem) => {
//     return (
//       <AdminUserCardItem
//         key={cardItem.id}
//         name={cardItem.name}
//         userName={cardItem.userName}
//         commentCount={cardItem.commentCount}
//         likeCount={cardItem.likeCount}
//         followingCount={cardItem.followingCount}
//         followerCount={cardItem.followerCount}
//       />
//     );
//   });
//   return (
//     <div className={styles.AdminCards}>
//       <div className={styles.cardContainer}>{adminUserCardList}</div>
//     </div>
//   );
// }
// export default AdminUserCardList;
