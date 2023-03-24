// import { usersList, tweetsList } from 'constants/constants';
import TweetHeader from 'users/components/TweetHeader/TweetHeader';
import TweetPost from 'users/components/TweetPost/TweetPost';
import styles from 'users/pages/Home.module.scss';

function Home() {
  // const currUser = usersList.find((user) => user.userId === 'u1');
  // const currUserFollowingList = currUser.following;

  // const followingUsersTweetsList = tweetsList.filter((tweet) =>
  //   currUserFollowingList.includes(tweet.userId)
  // );

  return (
    <div className={styles.tweet}>
      <TweetHeader label="首頁" info="25 推文" />
      <TweetPost placeholder="有什麼新鮮事嗎?" />
    </div>
  );
}

export default Home;
