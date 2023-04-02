import styles from 'shared/components/UIElements/UserBanner.module.scss';

function UserBanner({ className, image, alt, width, height, overlayStyles }) {
  return (
    <div className={`${styles.banner} ${className}`}>
      {image && <img src={image} alt={alt} style={(width, height)} />}
      {!image && <div className={styles.defaultBanner} />}
      <div className={`${styles.overlay} ${overlayStyles}`} />
    </div>
  );
}

export default UserBanner;
