import { Link } from 'react-router-dom';

import { ReactComponent as SiteLogo } from 'assets/icons/logoIcon.svg';
import Input from 'shared/components/UIElements/Input';
import Button from 'shared/components/UIElements/Button';

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_PASSWORD_VERIFY,
  VALIDATOR_REQUIRE,
} from 'shared/utils/validators';
import useForm from 'hooks/useForm';
import styles from 'shared/pages/Login.module.scss';
import 'styles/global.scss';

function Register() {
  const initialFormInputs = {
    account: {
      val: '',
      isValid: false,
    },
    name: {
      val: '',
      isValid: false,
    },
    email: {
      val: '',
      isValid: false,
    },
    password: {
      val: '',
      isValid: false,
    },
    passwordVerify: {
      val: '',
      isValid: false,
    },
  };

  const [formState, handleInput] = useForm(initialFormInputs, false);

  // NEED TO WORK ON PASSWORD VERIFY VALIDATION
  return (
    <div className="app-container">
      <div className={styles.registerContainer}>
        <div className={styles.registerHeader}>
          <SiteLogo />
          <h2>建立你的帳號</h2>
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
              id="name"
              label="名稱"
              element="input"
              type="text"
              placeholder=""
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(12)]}
              onInput={handleInput}
              errorText={
                formState.inputs.name.val.length > 12
                  ? '名稱不能超過12個字數'
                  : '請填寫名稱'
              }
              inputStyles={styles.input}
            />
            <Input
              id="email"
              label="Email"
              element="input"
              type="email"
              placeholder=""
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
              onInput={handleInput}
              errorText={
                formState.inputs.email.val.trim() !== ''
                  ? '請輸入正確的Email格式'
                  : '請填寫Email'
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
            <Input
              id="passwordVerify"
              label="密碼確認"
              element="input"
              type="password"
              placeholder=""
              validators={[
                VALIDATOR_REQUIRE(),
                VALIDATOR_MAXLENGTH(16),
                VALIDATOR_PASSWORD_VERIFY(formState.inputs.password.val),
              ]}
              onInput={handleInput}
              errorText="密碼不一致"
              inputStyles={styles.input}
            />
            <div className={styles.actionContainer}>
              <Button className={styles.formBtn}>註冊</Button>
              <Link to="/login" className={styles.formLink}>
                取消
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Register;
