import { Link, useNavigate } from 'react-router-dom';

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
import { useAuth } from 'contexts/AuthContext';
import { useEffect, useState } from 'react';

function AdminLogin() {
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
  const { adminLogin, isAuthenticated, role } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role === 'admin') {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate, role]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!formState.formIsValid) {
      return;
    }

    const response = await adminLogin({
      account: formState.inputs.account.val,
      password: formState.inputs.password.val,
    });

    const { status } = response;
    if (status === 'error') {
      setLoginError(true);
      navigate('/admin_login');
    }
  };

  return (
    <div className="app-container">
      <div className={styles.registerContainer}>
        <div className={styles.registerHeader}>
          <SiteLogo />
          <h2>後台登入</h2>
        </div>
        <div className={styles.formControl}>
          <form onSubmit={handleAdminLogin}>
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
              inputStyles={`${styles.input} ${
                loginError ? styles.formInvalid : undefined
              }`}
              onInputChangeStyle={setLoginError}
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
              inputStyles={`${styles.input} ${
                loginError ? styles.formInvalid : undefined
              }`}
              onInputChangeStyle={setLoginError}
            />
            <div className={styles.actionContainer}>
              <Button type="submit" className={styles.formBtn}>
                登入
              </Button>
              <div className={styles.formLinkContainer}>
                <Link to="/login" className={styles.formLink}>
                  前台登入
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
export default AdminLogin;
