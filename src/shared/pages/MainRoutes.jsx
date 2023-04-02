import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import AdminMain from 'admin/pages/AdminMain';
import AdminUserList from 'admin/pages/AdminUserList';
import { useAuth } from 'contexts/AuthContext';
import AdminLogin from 'shared/pages/AdminLogin';
import Login from 'shared/pages/Login';
import Register from 'shared/pages/Register';
import RootLayout from 'shared/pages/RootLayout';
import Setting from 'shared/pages/Setting';
import UserProfile from 'userProfile/pages/UserProfile';
import TweetList from 'users/components/TweetList/TweetList';
import TweetModal from 'users/components/TweetModal/TweetModal';
import UserTweet from 'users/pages/UserTweet';
import UserTweetReply from 'users/pages/UserTweetReply';
import PrivateRoutes from 'shared/utils/PrivateRoutes';
import { useEffect } from 'react';
import AdminRootLayout from 'admin/pages/AdminRoute';

function MainRoutes({ location }) {
  const { currentUser, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken && role === 'user') {
      navigate('/home');
    }

    if (authToken && role === 'admin') {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate, role]);

  return (
    <Routes location={location}>
      <Route path="login" element={<Login />} />
      <Route path="admin_login" element={<AdminLogin />} />
      <Route path="register" element={<Register />} />
      <Route path="*" element={<Navigate to="login" />} />

      <Route element={<PrivateRoutes allowedRoles={['admin']} />}>
        <Route element={<AdminRootLayout />}>
          <Route path="admin" element={<AdminMain />} />
          <Route path="admin_users" element={<AdminUserList />} />
        </Route>
      </Route>

      <Route element={<PrivateRoutes allowedRoles={['user']} />}>
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
