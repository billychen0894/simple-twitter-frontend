import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'assets/icons/homeIcon.svg';
import { ReactComponent as ActiveHomeIcon } from 'assets/icons/ActiveHomeIcon.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profileIcon.svg';
import { ReactComponent as ActiveProfileIcon } from 'assets/icons/ActiveProfileIcon.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/settingIcon.svg';
import { ReactComponent as ActiveSettingIcon } from 'assets/icons/ActiveSettingIcon.svg';

import styles from 'shared/components/Navigation/NavLinks.module.scss';
import { useUsers } from 'contexts/UsersContext';
import { useAuth } from 'contexts/AuthContext';

function NavLinks() {
  const { currentUser } = useAuth();
  const { fetchUser } = useUsers();

  const handleFetchUser = () => {
    fetchUser(currentUser?.id);
  };

  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink
          to="home"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                {isActive ? <ActiveHomeIcon /> : <HomeIcon />}
              </div>
              <div className={styles.textWrapper}>
                <span>首頁</span>
              </div>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to={`${currentUser?.id}`}
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          end
        >
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                {isActive ? <ActiveProfileIcon /> : <ProfileIcon />}
              </div>
              <div className={styles.textWrapper}>
                <span>個人資料</span>
              </div>
            </>
          )}
        </NavLink>
      </li>
      <li>
        <NavLink
          to="setting"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
          onClick={handleFetchUser}
        >
          {({ isActive }) => (
            <>
              <div className={styles.iconWrapper}>
                {isActive ? <ActiveSettingIcon /> : <SettingIcon />}
              </div>
              <div className={styles.textWrapper}>
                <span>設定</span>
              </div>
            </>
          )}
        </NavLink>
      </li>
    </ul>
  );
}
export default NavLinks;
