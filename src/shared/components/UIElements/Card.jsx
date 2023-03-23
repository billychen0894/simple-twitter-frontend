import styles from 'shared/components/UIElements/Card.module.scss';

function Card({ className, children }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

export default Card;
