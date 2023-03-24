import handlePastedTextFormatting from 'shared/utils/formattingRemover';
import styles from 'users/components/TweetPost/TweetEditor.module.scss';

function TweetEditor({ placeholder, onInputChange, inputValue }) {
  return (
    <div className={styles.editorRoot}>
      {!inputValue && (
        <div className={styles.placeholderContainer}>
          <div className={styles.placeholder}>{placeholder}</div>
        </div>
      )}
      <div className={styles.editorContainer}>
        <div
          onPaste={handlePastedTextFormatting}
          className={styles.editor}
          contentEditable
          onInput={onInputChange}
        />
      </div>
    </div>
  );
}

export default TweetEditor;
