import { Navigate, Route, Routes } from 'react-router-dom';

import RootLayout from 'shared/pages/RootLayout';
import TweetModal from 'users/components/TweetModal/TweetModal';
import UserProfile from 'userProfile/pages/UserProfile';
import TweetList from 'users/components/TweetList/TweetList';
import UserTweetReply from 'users/pages/UserTweetReply';
import UserTweet from 'users/pages/UserTweet';
import { replyList, tweetsList, usersList } from 'constants/constants';
import Setting from 'shared/pages/Setting';
import Login from 'shared/pages/Login';
import Register from 'shared/pages/Register';
import AdminLogin from 'shared/pages/AdminLogin';
import PrivateRoutes from 'shared/utils/PrivateRoutes';

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
      <Route path="login" element={<Login />} />
      <Route path="admin_login" element={<AdminLogin />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="login" />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<RootLayout />}>
          <Route path="setting" element={<Setting />} />
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
      </Route>
    </Routes>
  );
}

export default MainRoutes;
