import { Outlet } from 'react-router-dom';

import MainNavigation from 'shared/components/Navigation/MainNavigation';

function RootLayout() {
  return (
    <div className="app-container">
      <MainNavigation />
      <div className="content-container">
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default RootLayout;
