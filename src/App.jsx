import { useLocation, Route, Routes } from 'react-router-dom';

import ModalProvider from 'contexts/ModalContentContext';
import TweetModalRoute from 'users/pages/TweetModalRoute';
import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
import MainRoutes from 'shared/pages/MainRoutes';
import 'styles/global.scss';
import AdminUserCard from 'shared/components/AdminUserCard/AdminUserCard';
// import AdminUsersLayout from 'admin/pages/AdminUsersLayout';
import AdminTweetListItem from 'admin/AdminTweetList/AdminTweetListItem';

function App() {
  const location = useLocation();
  const background = location.state?.background;
  const action = location.state?.action;

  return (
    <ModalProvider>
      {background && action === 'TWEET' && <TweetModalRoute />}
      {background && action === 'EDIT' && <EditProfileModalRoute />}
      <Routes>
        <Route path="admin" element={<AdminUserCard />} />
        <Route path="adminuser" element={<AdminTweetListItem />} /> 
      </Routes>
      <MainRoutes location={background || location} />
    </ModalProvider>
  );
}

export default App;
