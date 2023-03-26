import { Route, Routes } from 'react-router-dom';

import RootLayout from 'shared/pages/RootLayout';
import Home from 'users/pages/Home';
import 'styles/global.scss';
import AdminUserCard from 'shared/components/AdminUserCard/AdminUserCard';
// import AdminUsersLayout from 'admin/pages/AdminUsersLayout';
import AdminTweetListItem from 'admin/AdminTweetList/AdminTweetListItem';

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="admin" element={<AdminUserCard />} />
        <Route path="adminuser" element={<AdminTweetListItem />} />
      </Route>
    </Routes>
  );
}

export default App;
