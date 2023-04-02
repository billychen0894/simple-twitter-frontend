import AdminTweetListItem from 'admin/AdminTweetList/AdminTweetListItem';
import { formattingTime } from 'shared/utils/formattingTime';
import styles from 'admin/AdminTweetList/AdminTweetList.module.scss';

function AdminTweetList({ listItems }) {
  const content = listItems.map((item) => {
    return (
      <AdminTweetListItem
        key={item.id}
        tweetId={item?.id}
        name={item?.User.name}
        userAccountName={item?.User.account}
        content={item?.description}
        userAvatar={item?.User.avatar}
        time={formattingTime(item?.createdAt)}
      />
    );
  });
  return <article className={styles.tweetList}>{content}</article>;
}

export default AdminTweetList;
