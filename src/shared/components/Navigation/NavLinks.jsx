import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'assets/icons/homeIcon.svg';
import { ReactComponent as ProfileIcon } from 'assets/icons/profileIcon.svg';
import { ReactComponent as SettingIcon } from 'assets/icons/settingIcon.svg';

import styles from 'shared/components/Navigation/NavLinks.module.scss';

function NavLinks() {
  return (
    <ul className={styles.navLinks}>
      <li>
        <NavLink
          to="/home"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <div className={styles.iconWrapper}>
            <HomeIcon />
          </div>
          <div className={styles.textWrapper}>
            <span>首頁</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <div className={styles.iconWrapper}>
            <ProfileIcon />
          </div>
          <div className={styles.textWrapper}>
            <span>個人資料</span>
          </div>
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/setting"
          className={({ isActive }) => (isActive ? styles.active : undefined)}
        >
          <div className={styles.iconWrapper}>
            <SettingIcon />
          </div>
          <div className={styles.textWrapper}>
            <span>設定</span>
          </div>
        </NavLink>
      </li>
    </ul>
  );
}
export default NavLinks;
