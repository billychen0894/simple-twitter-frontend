import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from 'contexts/AuthContext';
import { TweetsProvider } from 'contexts/TweetsContext';
import { UsersProvider } from 'contexts/UsersContext';
import ModalProvider from 'contexts/ModalContentContext';
import { AdminProvider } from 'contexts/AdminContext';
import MainRoutes from 'shared/pages/MainRoutes';
import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
import TweetModalRoute from 'users/pages/TweetModalRoute';
import 'styles/global.scss';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const action = location.state?.action;

  return (
    <AuthProvider>
      <UsersProvider>
        <AdminProvider>
          <TweetsProvider>
            <ModalProvider>
              {background && action === 'TWEET' && <TweetModalRoute />}
              {background && action === 'EDIT' && <EditProfileModalRoute />}
              <MainRoutes location={background || location} />
              <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                closeOnClick
                pauseOnHover
                draggable
                theme="light"
              />
            </ModalProvider>
          </TweetsProvider>
        </AdminProvider>
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
