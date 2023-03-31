import { forwardRef } from 'react';
import handlePastedTextFormatting from 'shared/utils/formattingRemover';
import styles from 'users/components/TweetPost/TweetEditor.module.scss';

const TweetEditor = forwardRef(
  (
    { placeholder, onInputChange, inputValue, className, onInputTouch },
    ref
  ) => {
    return (
      <div className={`${styles.editorRoot} ${className}`}>
        {!inputValue && (
          <div className={styles.placeholderContainer}>
            <div className={styles.placeholder}>{placeholder}</div>
          </div>
        )}
        <div className={styles.editorContainer}>
          <div
            ref={ref}
            onPaste={handlePastedTextFormatting}
            className={styles.editor}
            contentEditable
            onInput={onInputChange}
            onBlur={onInputTouch}
          />
        </div>
      </div>
    );
  }
);

TweetEditor.displayName = 'TweetEditor';

export default TweetEditor;
