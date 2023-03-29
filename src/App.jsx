import { Route, Routes } from 'react-router-dom';

import ModalProvider from 'contexts/ModalContentContext';
// import TweetModalRoute from 'users/pages/TweetModalRoute';
// import EditProfileModalRoute from 'users/pages/EditProfileModalRoute';
// import MainRoutes from 'shared/pages/MainRoutes';
import 'styles/global.scss';
// import AdminUserCardList from 'admin/AdminUserCard/AdminUserCardList';
import AdminUserCardItem from 'admin/AdminUserCard/AdminUserCardItem';
// import AdminUsersLayout from 'admin/pages/AdminUsersLayout';
// import AdminTweetList from 'admin/AdminTweetList/AdminTweetList';
// import AdminNavLinks from 'shared/components/Navigation/AdminNavLinks';

function App() {
  // const location = useLocation();
  // const background = location.state?.background;
  // const action = location.state?.action;

  return (
    <ModalProvider>
      {/* {background && action === 'TWEET' && <TweetModalRoute />}
      {background && action === 'EDIT' && <EditProfileModalRoute />} */}
      <Routes>
        <Route path="admin" element={<AdminUserCardItem />} />
        {/* <Route path="adminuser" element={<AdminUserCardList />} /> */}
      </Routes>
      {/* <MainRoutes location={background || location} /> */}
    </ModalProvider>
  );
}

export default App;
