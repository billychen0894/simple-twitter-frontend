import { Outlet, useMatch } from 'react-router-dom';
import FollowersList from 'shared/components/Followers/FollowersList';

import MainNavigation from 'shared/components/Navigation/MainNavigation';

function RootLayout() {
  const settingMatch = useMatch('/setting');
  return (
    <div className="app-container">
      <MainNavigation />
      <div className="content-container">
        <main
          className={`main-content ${settingMatch && 'main-content__setting'}`}
        >
          <Outlet />
        </main>
        {!settingMatch && <FollowersList />}
      </div>
    </div>
  );
}

export default RootLayout;
