import { NavLink } from 'react-router-dom';

import AdminNavLinks from 'shared/components/Navigation/AdminNavLinks';
import { ReactComponent as SiteLogo } from 'assets/icons/logoIcon.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logoutIcon.svg';
import { useAuth } from 'contexts/AuthContext';
import styles from 'shared/components/Navigation/AdminNavigation.module.scss';

function AdminNavigation() {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  return (
    <header className={styles.mainHeader}>
      <div className={styles.mainNavigation}>
        <div className={styles.navLinks}>
          <NavLink to="/admin" className={styles.logoWrapper}>
            <SiteLogo className={styles.logo} />
          </NavLink>
          <nav className={styles.navLinksWrapper}>
            <AdminNavLinks />
          </nav>
        </div>
        <div
          className={styles.logout}
          onClick={handleLogout}
          role="presentation"
        >
          <div className={styles.logoutIcon}>
            <LogoutIcon />
          </div>
          <div className={styles.logoutText}>
            <span>登出</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminNavigation;
