import { Route, Routes } from 'react-router-dom';

import RootLayout from 'shared/pages/RootLayout';
import TweetModal from 'users/components/TweetModal/TweetModal';
import UserProfile from 'userProfile/pages/UserProfile';
import TweetList from 'users/components/TweetList/TweetList';
import UserTweetReply from 'users/pages/UserTweetReply';
import UserTweet from 'users/pages/UserTweet';
import { replyList, tweetsList, usersList } from 'constants/constants';

function MainRoutes({ location }) {
  const userInfo = usersList.find((user) => user.userId === 'u1');
  const { followers } = userInfo;
  const { following } = userInfo;

  const followingUsersTweetsList = tweetsList.filter((tweet) =>
    following.includes(tweet.userId)
  );

  const followersTweetsList = tweetsList.filter((tweet) =>
    followers.includes(tweet.userId)
  );

  const followingTweetsList = tweetsList.filter((tweet) =>
    following.includes(tweet.userId)
  );
  const tweetReplyList = replyList.filter((reply) => reply.tweetId === 't1');

  return (
    <Routes location={location}>
      <Route element={<RootLayout />}>
        <Route path="home" element={<UserTweet />}>
          <Route path="compose/tweet" element={<TweetModal />} />
        </Route>
        <Route path="/:userId/reply/:tweetId" element={<UserTweetReply />}>
          <Route path="compose/tweet" element={<TweetModal />} />
        </Route>
        <Route path=":userId" element={<UserProfile />}>
          <Route
            path=""
            element={
              <TweetList
                listType="homeTweets"
                listItems={followingUsersTweetsList}
              />
            }
          />
          <Route
            path="reply"
            element={
              <TweetList
                listType="userReply"
                listItems={tweetReplyList}
                tweetUserName={userInfo.name}
              />
            }
          />

          <Route
            path="like"
            element={
              <TweetList
                listType="homeTweets"
                listItems={followingUsersTweetsList}
              />
            }
          />

          <Route
            path="followers"
            element={
              <TweetList
                listType="otherUsersTweets"
                listItems={followersTweetsList}
              />
            }
          />

          <Route
            path="following"
            element={
              <TweetList
                listType="otherUsersTweets"
                listItems={followingTweetsList}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
