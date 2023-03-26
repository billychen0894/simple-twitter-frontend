import { Link } from 'react-router-dom';

import { ReactComponent as SiteLogo } from 'assets/icons/logoIcon.svg';
import Input from 'shared/components/UIElements/Input';
import Button from 'shared/components/UIElements/Button';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from 'shared/utils/validators';
import useForm from 'hooks/useForm';
import styles from 'shared/pages/Login.module.scss';
import 'styles/global.scss';

function Login() {
  const initialFormInputs = {
    account: {
      val: '',
      isValid: false,
    },
    password: {
      val: '',
      isValid: false,
    },
  };

  const [formState, handleInput] = useForm(initialFormInputs, false);

  return (
    <div className="app-container">
      <div className={styles.registerContainer}>
        <div className={styles.registerHeader}>
          <SiteLogo />
          <h2>登入&nbsp;Alphitter</h2>
        </div>
        <div className={styles.formControl}>
          <form action="">
            <Input
              id="account"
              label="帳號"
              element="input"
              type="text"
              placeholder=""
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(16)]}
              onInput={handleInput}
              errorText={
                formState.inputs.account.val.length > 16
                  ? '帳號不能超過16個字數'
                  : '請填寫帳號'
              }
              inputStyles={styles.input}
            />
            <Input
              id="password"
              label="密碼"
              element="input"
              type="password"
              placeholder=""
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(16)]}
              onInput={handleInput}
              errorText={
                formState.inputs.password.val > 16
                  ? '密碼不能超過16個字數'
                  : '請輸入密碼'
              }
              inputStyles={styles.input}
            />
            <div className={styles.actionContainer}>
              <Button className={styles.formBtn}>登入</Button>
              <div className={styles.formLinkContainer}>
                <Link to="/register" className={styles.formLink}>
                  註冊Alphitter
                </Link>
                <span className={styles.formLink}>·</span>
                <Link to="/admin_login" className={styles.formLink}>
                  後台登入
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
