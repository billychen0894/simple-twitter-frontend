import { NavLink } from 'react-router-dom';
import AdminMainHeader from 'shared/components/Navigation/AdminMainHeader';
import AdminNavLinks from 'shared/components/Navigation/AdminNavLinks';
import { ReactComponent as SiteLogo } from 'assets/icons/logoIcon.svg';
import { ReactComponent as LogoutIcon } from 'assets/icons/logoutIcon.svg';
import styles from 'shared/components/Navigation/AdminNavigation.module.scss';

function AdminNavigation() {
  return (
    <AdminMainHeader>
      <div className={styles.adminNavigationContainter}>
        <div className={styles.adminNavLinks}>
          <NavLink to="/admin" className={styles.logoWrapper}>
            <SiteLogo />
          </NavLink>
          <nav className={styles.adminNavLinksWrapper}>
            <AdminNavLinks />
          </nav>
        </div>
        <div className={styles.logout}>
          <div className={styles.logoutIcon}>
            <LogoutIcon />
          </div>
          <div className={styles.logoutText}>
            <span>登出</span>
          </div>
        </div>
      </div>
    </AdminMainHeader>
  );
}

export default AdminNavigation;
