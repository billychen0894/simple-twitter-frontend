import { Navigate, Route, Routes } from 'react-router-dom';

import RootLayout from 'shared/pages/RootLayout';
import TweetModal from 'users/components/TweetModal/TweetModal';
import UserProfile from 'userProfile/pages/UserProfile';
import TweetList from 'users/components/TweetList/TweetList';
import UserTweetReply from 'users/pages/UserTweetReply';
import UserTweet from 'users/pages/UserTweet';
import Setting from 'shared/pages/Setting';
import Login from 'shared/pages/Login';
import Register from 'shared/pages/Register';
import AdminLogin from 'shared/pages/AdminLogin';
import PrivateRoutes from 'shared/utils/PrivateRoutes';
import { useAuth } from 'contexts/AuthContext';

function MainRoutes({ location }) {
  const { currentUser } = useAuth();

  return (
    <Routes location={location}>
      <Route path="login" element={<Login />} />
      <Route path="admin_login" element={<AdminLogin />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="login" />} />
      <Route element={<PrivateRoutes />}>
        <Route element={<RootLayout />}>
          <Route path="setting" element={<Setting userData={currentUser} />} />
          <Route path="home" element={<UserTweet />}>
            <Route path="compose/tweet" element={<TweetModal />} />
          </Route>
          <Route path="/:userId/reply/:tweetId" element={<UserTweetReply />}>
            <Route path="compose/tweet" element={<TweetModal />} />
          </Route>
          <Route path=":userId" element={<UserProfile />}>
            <Route path="" element={<TweetList listType="userTweets" />} />
            <Route
              path="reply"
              element={
                <TweetList
                  listType="reply"
                  currentUserName={currentUser?.name}
                  currentAccountName={currentUser?.account}
                  currentUserAvatar={currentUser?.avatar}
                  currentUserId={currentUser?.id}
                />
              }
            />

            <Route path="like" element={<TweetList listType="like" />} />

            <Route
              path="followers"
              element={
                <TweetList listType="followers" followType="followers" />
              }
            />

            <Route
              path="following"
              element={
                <TweetList listType="following" followType="following" />
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;
