import TweetHeader from 'users/components/TweetHeader/TweetHeader';
import TweetList from 'users/components/TweetList/TweetList';
import TweetReply from 'users/components/TweetReply/TweetReply';
import { usersList, tweetsList, replyList } from 'constants/constants';
import styles from 'users/pages/Home.module.scss';

function UserTweetReply() {
  const currTweetInfo = tweetsList.find((tweet) => tweet.tweetId === 't1');
  const { content, commentCount, likeCount, createdAt } = currTweetInfo;

  const userInfo = usersList.find(
    (user) => user.userId === currTweetInfo.userId
  );
  const { image, name, username } = userInfo;

  const tweetReplyList = replyList.filter((reply) => reply.tweetId === 't1');

  return (
    <div className={styles.tweet}>
      <TweetHeader userPostsHeader label="首頁" info="25 推文" />
      <TweetReply
        image={image}
        name={name}
        username={username}
        tweetContent={content}
        time={createdAt}
        date={createdAt}
        commentCount={commentCount}
        likeCount={likeCount}
      />
      <TweetList
        listType="userReply"
        listItems={tweetReplyList}
        tweetUserName={userInfo.name}
      />
    </div>
  );
}

export default UserTweetReply;
