import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'assets/icons/homeIcon.svg';
import { ReactComponent as ActiveHomeIcon } from 'assets/icons/ActiveHomeIcon.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profileIcon.svg';
import { ReactComponent as ActiveProfileIcon } from 'assets/icons/ActiveProfileIcon.svg';
import styles from 'shared/components/Navigation/NavLinks.module.scss';

function AdminNavLinks() {
  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                {isActive ? <ActiveHomeIcon /> : <HomeIcon />}
              </div>
              <div className={styles.textWrapper}>
                <span>推文清單</span>
              </div>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/admin_users"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          end
        >
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                {isActive ? <ActiveProfileIcon /> : <ProfileIcon />}
              </div>
              <div className={styles.textWrapper}>
                <span>使用者列表</span>
              </div>
            </>
          )}
        </NavLink>
      </li>
    </ul>
  );
}
export default AdminNavLinks;
