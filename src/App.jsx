import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from 'contexts/AuthContext';
import ModalProvider from 'contexts/ModalContentContext';
import { TweetsProvider } from 'contexts/TweetContext';
import { UsersProvider } from 'contexts/UsersContext';
import MainRoutes from 'shared/pages/MainRoutes';
import 'styles/global.scss';
import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
import TweetModalRoute from 'users/pages/TweetModalRoute';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const action = location.state?.action;

  return (
    <AuthProvider>
      <UsersProvider>
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
      </UsersProvider>
    </AuthProvider>
  );
}

export default App;
