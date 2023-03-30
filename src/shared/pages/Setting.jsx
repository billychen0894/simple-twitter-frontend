import useForm from 'hooks/useForm';
import Button from 'shared/components/UIElements/Button';
import Input from 'shared/components/UIElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD_VERIFY,
} from 'shared/utils/validators';
import styles from 'shared/pages/Setting.module.scss';

function Setting() {
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
  return (
    <div className={styles.settingContainer}>
      <header className={styles.settingHeader}>帳戶設定</header>
      <div className={styles.formControl}>
        <form action="" className={styles.settingForm}>
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
            <Button
              disabled={!formState.formIsValid}
              className={styles.formBtn}
            >
              儲存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Setting;
