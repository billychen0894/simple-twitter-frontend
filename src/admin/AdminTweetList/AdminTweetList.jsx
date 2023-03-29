import styles from 'admin/AdminTweetList/AdminTweetList.module.scss';
import AdminTweetListItem from 'admin/AdminTweetList/AdminTweetListItem';

// function AdminTweetList({ adminTweetListItems }) {
//   const Admincontent = adminTweetListItems.map((Adminitem) => {
//     return (
//       <AdminTweetListItem
//         key={Adminitem.userId}
//         userId={Adminitem.userId}
//         content={Adminitem.content || Adminitem.replyContent}
//         time={Adminitem.createdAt}
//       />
//     );
//   });

// return (
//   <div className={styles.AdminTweets}>
//     <article className={styles.adminTweetListContainer}>{Admincontent}</article>
//   </div>
// )
// }

// export default AdminTweetList;

function AdminTweetList() {
  return (
    <div className={styles.AdminTweets}>
      <div className={styles.adminTweetListContainer}>
        <AdminTweetListItem />
        <AdminTweetListItem />
        <AdminTweetListItem />
      </div>
    </div>
  );
}

export default AdminTweetList;
