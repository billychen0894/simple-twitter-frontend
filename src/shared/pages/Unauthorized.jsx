import styles from 'shared/pages/Unauthorized.module.scss';

function Unauthorized() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>未經授權訪問</h1>
      <p className={styles.text}>抱歉，您沒有訪問此頁面的權限</p>
    </div>
  );
}

export default Unauthorized;
