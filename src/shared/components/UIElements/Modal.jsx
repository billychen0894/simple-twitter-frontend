import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';

import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';
import Backdrop from 'shared/components/UIElements/Backdrop';
import Button from 'shared/components/UIElements/Button';
import styles from 'shared/components/UIElements/Modal.module.scss';

const cx = classNames.bind(styles);

function ModalOverlay({
  children,
  btnLabel,
  className,
  style,
  handleCloseModal,
  inputValue,
  modalTitle,
  overrideDefaultBtn,
  dividerNone,
  onTouch,
  onClick,
}) {
  const dividerStyles = cx({
    mainContent: true,
    mainContentDividerNone: dividerNone,
  });

  const content = (
    <div className={`${styles.modal} ${className}`} style={style}>
      <div className={styles.headerWrapper}>
        <div
          role="presentation"
          className={styles.closeIcon}
          onClick={handleCloseModal}
        >
          <CloseIcon />
        </div>
        {modalTitle && <div className={styles.modalTitle}>{modalTitle}</div>}
      </div>
      <div className={dividerStyles}>{children}</div>
      {!overrideDefaultBtn && (
        <div className={styles.btnWrapper}>
          {onTouch && inputValue === '' && (
            <span className={styles.errorText}>內容不可空白</span>
          )}
          {onTouch && inputValue.length >= 140 && (
            <span className={styles.errorText}>字數不可超過140字</span>
          )}
          <Button
            disabled={inputValue === '' || inputValue.length >= 140}
            className={styles.btn}
            onClick={onClick}
          >
            {btnLabel}
          </Button>
        </div>
      )}
    </div>
  );

  return createPortal(content, document.getElementById('modalOverlay'));
}

function Modal({
  handleCloseModal,
  children,
  btnLabel,
  className,
  style,
  inputValue,
  modalTitle,
  overrideDefaultBtn,
  dividerNone,
  onTouch,
  onClick,
}) {
  return (
    <>
      <Backdrop onClick={handleCloseModal} />

      <ModalOverlay
        btnLabel={btnLabel}
        className={className}
        style={style}
        handleCloseModal={handleCloseModal}
        inputValue={inputValue}
        modalTitle={modalTitle}
        overrideDefaultBtn={overrideDefaultBtn}
        dividerNone={dividerNone}
        onTouch={onTouch}
        onClick={onClick}
      >
        {children}
      </ModalOverlay>
    </>
  );
}

export default Modal;
