import { createPortal } from 'react-dom';
import styles from 'shared/components/UIElements/Backdrop.module.scss';

function Backdrop({ onClick }) {
  const content = (
    <div role="presentation" className={styles.backdrop} onClick={onClick} />
  );

  return createPortal(content, document.getElementById('backdrop'));
}
export default Backdrop;
