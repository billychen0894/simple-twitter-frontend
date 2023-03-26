import { ReactComponent as DefaultAvatar } from 'assets/icons/defaultAvatar.svg';
import styles from 'shared/components/UIElements/Avatar.module.scss';

function Avatar({
  className,
  image,
  alt,
  width,
  height,
  overlayStyles,
  defaultAvatarStyle,
  onClick,
}) {
  return (
    <div
      className={`${styles.avatar} ${className}`}
      onClick={onClick}
      role="presentation"
    >
      {image && <img src={image} alt={alt} style={(width, height)} />}
      {!image && <DefaultAvatar className={defaultAvatarStyle} />}
      <div className={`${styles.overlay} ${overlayStyles}`} />
    </div>
  );
}

export default Avatar;
