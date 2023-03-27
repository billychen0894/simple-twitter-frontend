import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import { ReactComponent as SiteLogo } from 'assets/icons/logoIcon.svg';
import Input from 'shared/components/UIElements/Input';
import Button from 'shared/components/UIElements/Button';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from 'shared/utils/validators';
import useForm from 'hooks/useForm';
import { useAuth } from 'contexts/AuthContext';
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
  const { userLogin, role, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && role === 'user') {
      navigate('/home');
    }
  }, [isAuthenticated, navigate, role]);

  const handleUserLogin = (e) => {
    e.preventDefault();

    if (!formState.formIsValid) {
      return;
    }

    Swal.isLoading();

    const status = userLogin({
      account: formState.inputs.account.val,
      password: formState.inputs.password.val,
    });

    if (status === 'success') {
      Swal.fire({
        position: 'top',
        title: '登入成功！',
        timer: 1000,
        icon: 'success',
        showConfirmButton: false,
      });
      return;
    }

    if (status === 'failure' || status === 'error') {
      Swal.fire({
        position: 'top',
        title: '登入失敗！',
        timer: 1000,
        icon: 'error',
        showConfirmButton: false,
      });
    }

    Swal.hideLoading();
  };

  return (
    <div className="app-container">
      <div className={styles.registerContainer}>
        <div className={styles.registerHeader}>
          <SiteLogo />
          <h2>登入&nbsp;Alphitter</h2>
        </div>
        <div className={styles.formControl}>
          <form onSubmit={handleUserLogin}>
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
              <Button button="submit" className={styles.formBtn}>
                登入
              </Button>
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
