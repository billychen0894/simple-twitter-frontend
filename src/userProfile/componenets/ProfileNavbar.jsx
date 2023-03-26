import ProfileNavItem from 'userProfile/componenets/ProfileNavItem';
import styles from 'userProfile/componenets/ProfileNavbar.module.scss';

function ProfileNavbar({ navItemDetails, userId }) {
  return (
    <nav className={styles.profileNavbar}>
      {navItemDetails.map((navItem) => (
        <ProfileNavItem
          key={navItem.id}
          userId={userId}
          path={navItem.path}
          label={navItem.label}
          match={navItem.match}
        />
      ))}
    </nav>
  );
}

export default ProfileNavbar;
