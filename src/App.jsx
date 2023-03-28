import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ModalProvider from 'contexts/ModalContentContext';
import TweetModalRoute from 'users/pages/TweetModalRoute';
import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
import MainRoutes from 'shared/pages/MainRoutes';
import 'styles/global.scss';
import { AuthProvider } from 'contexts/AuthContext';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const action = location.state?.action;

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
