import styles from 'admin/AdminTweetList/AdminTweetList.module.scss';
import AdminTweetListItem from 'admin/AdminTweetList/AdminTweetListItem';

function AdminTweetList({ adminTweetListItems }) {
  const Admincontent = adminTweetListItems.map((Adminitem) => {
    return (
      <AdminTweetListItem
        key={Adminitem.userId}
        userId={Adminitem.userId}
        content={Adminitem.content || Adminitem.replyContent}
        time={Adminitem.createdAt}
      />
    );
  });

  return <article className={styles.tweetList}>{Admincontent}</article>;
}

export default AdminTweetList;
