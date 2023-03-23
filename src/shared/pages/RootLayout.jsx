import { Outlet } from 'react-router-dom';
import FollowersList from 'shared/components/Followers/FollowersList';

import MainNavigation from 'shared/components/Navigation/MainNavigation';

function RootLayout() {
  return (
    <div className="app-container">
      <MainNavigation />
      <div className="content-container">
        <main className="main-content">
          <Outlet />
        </main>
        <FollowersList />
      </div>
    </div>
  );
}

export default RootLayout;
