import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import decode from 'jwt-decode';

import ModalProvider from 'contexts/ModalContentContext';
import TweetModalRoute from 'users/pages/TweetModalRoute';
import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
import { AuthProvider } from 'contexts/AuthContext';
import { TweetsProvider } from 'contexts/TweetsContext';
import { UsersProvider } from 'contexts/UsersContext';
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
import 'styles/global.scss';
import { useState } from 'react';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const action = location.state?.action;
  const [currentUser, setCurrentUser] = useState(null);
  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    const token = decode(authToken);
    setCurrentUser(token);
  }

  return (
    <AuthProvider>
      <UsersProvider>
        <TweetsProvider>
          <ModalProvider>
            <Routes>
              {background && action === 'TWEET' && <TweetModalRoute />}
              {background && action === 'EDIT' && <EditProfileModalRoute />}
              <Route path="/login" element={<Login />} />
              <Route path="/admin_login" element={<AdminLogin />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Navigate to="login" />} />
              <Route element={<PrivateRoutes />}>
                <Route element={<RootLayout />}>
                  <Route path="setting" element={<Setting />} />
                  <Route path="home" element={<UserTweet />}>
                    <Route path="compose/tweet" element={<TweetModal />} />
                  </Route>
                  <Route
                    path="/:userId/reply/:tweetId"
                    element={<UserTweetReply />}
                  >
                    <Route path="compose/tweet" element={<TweetModal />} />
                  </Route>
                  <Route path=":userId" element={<UserProfile />}>
                    <Route
                      path=""
                      element={<TweetList listType="userTweets" />}
                    />
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

                    <Route
                      path="like"
                      element={<TweetList listType="like" />}
                    />

                    <Route
                      path="followers"
                      element={
                        <TweetList
                          listType="followers"
                          followType="followers"
                        />
                      }
                    />

                    <Route
                      path="following"
                      element={
                        <TweetList
                          listType="following"
                          followType="following"
                        />
                      }
                    />
                  </Route>
                </Route>
              </Route>
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
            </Routes>
          </ModalProvider>
        </TweetsProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
