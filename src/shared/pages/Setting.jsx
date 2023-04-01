import { useState } from 'react';
import { toast } from 'react-toastify';

import Button from 'shared/components/UIElements/Button';
import Input from 'shared/components/UIElements/Input';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_EMAIL,
  VALIDATOR_PASSWORD_VERIFY,
} from 'shared/utils/validators';
import useForm from 'hooks/useForm';
import { useUsers } from 'contexts/UsersContext';
import styles from 'shared/pages/Setting.module.scss';

function Setting({ userData }) {
  const { updateUserSettings } = useUsers();

  const initialFormInputs = {
    account: {
      val: userData?.account || '',
      isValid: userData?.account || false,
    },
    name: {
      val: userData?.name || '',
      isValid: userData?.name || false,
    },
    email: {
      val: userData?.email || '',
      isValid: userData?.email || false,
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
  const [settingsError, setSettingsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.formIsValid) {
      return;
    }

    const payload = {
      account: formState.inputs.account.val,
      email: formState.inputs.email.val,
      name: formState.inputs.name.val,
      password: formState.inputs.password.val,
      checkPassword: formState.inputs.passwordVerify.val,
    };
    const response = await updateUserSettings(payload);

    const { success } = response;

    if (!success) {
      setSettingsError(true);
      toast.error('編輯失敗');
    }
    if (success) {
      setSettingsError(false);
      toast.success('編輯成功');
    }
  };

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
            inputStyles={`${styles.input} ${
              settingsError ? styles.formInvalid : undefined
            }`}
            onInputChangeStyle={setSettingsError}
            initialValue={initialFormInputs.account.val}
            initialValid={initialFormInputs.account.isValid}
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
            inputStyles={`${styles.input} ${
              settingsError ? styles.formInvalid : undefined
            }`}
            onInputChangeStyle={setSettingsError}
            initialValue={initialFormInputs.name.val}
            initialValid={initialFormInputs.name.isValid}
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
            inputStyles={`${styles.input} ${
              settingsError ? styles.formInvalid : undefined
            }`}
            onInputChangeStyle={setSettingsError}
            initialValue={initialFormInputs.email.val}
            initialValid={initialFormInputs.email.isValid}
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
              settingsError ? styles.formInvalid : undefined
            }`}
            onInputChangeStyle={setSettingsError}
            initialValue={initialFormInputs.password.val}
            initialValid={initialFormInputs.password.isValid}
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
            inputStyles={`${styles.input} ${
              settingsError ? styles.formInvalid : undefined
            }`}
            onInputChangeStyle={setSettingsError}
            initialValue={initialFormInputs.passwordVerify.val}
            initialValid={initialFormInputs.passwordVerify.isValid}
          />
          <div className={styles.actionContainer}>
            <Button
              disabled={!formState.formIsValid}
              className={styles.formBtn}
              onClick={handleSubmit}
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
