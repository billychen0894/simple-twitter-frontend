import Button from 'shared/components/UIElements/Button';
import styles from 'userProfile/componenets/ProfileNavItem.module.scss';

function ProfileNavItem({ path, label, match, userId }) {
  return (
    <div className={styles.profileNavItem}>
      <Button
        to={path ? `/${userId}/${path}` : `/${userId}`}
        className={styles.btn}
        replace
      >
        {({ isActive }) => (
          <div className={styles.labelContainer}>
            <span>{label}</span>
            <div className={isActive || match ? styles.btnTip : undefined} />
          </div>
        )}
      </Button>
    </div>
  );
}

export default ProfileNavItem;
