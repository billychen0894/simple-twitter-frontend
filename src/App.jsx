// import { useLocation } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';

// import ModalProvider from 'contexts/ModalContentContext';
// import TweetModalRoute from 'users/pages/TweetModalRoute';
// import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
// import MainRoutes from 'shared/pages/MainRoutes';
import 'styles/global.scss';
import { AuthProvider } from 'contexts/AuthContext';
import { Routes, Route } from 'react-router-dom';
import AdminMain from 'admin/pages/AdminMain';
import AdminUserList from 'admin/pages/AdminUserList';
import { TweetsProvider } from 'contexts/TweetContext';
import AdminLogin from 'shared/pages/AdminLogin';

function App() {
  // const location = useLocation();
  // const background = location.state?.background;
  // const action = location.state?.action;

  return (
    <AuthProvider>
      <TweetsProvider>
        <Routes>
          <Route path="admin" element={<AdminMain />} />
          <Route path="admin_user_list" element={<AdminUserList />} />
          <Route path="admin_login" element={<AdminLogin />} />
        </Routes>
      </TweetsProvider>
      {/* <ModalProvider>
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
      </ModalProvider> */}
    </AuthProvider>
  );
}

export default App;
