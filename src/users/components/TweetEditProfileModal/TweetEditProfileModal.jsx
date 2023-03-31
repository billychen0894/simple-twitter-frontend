import { useNavigate } from 'react-router-dom';

import { useAuth } from 'contexts/AuthContext';
import { useUsers } from 'contexts/UsersContext';
import Avatar from 'shared/components/UIElements/Avatar';
import Input from 'shared/components/UIElements/Input';
import Button from 'shared/components/UIElements/Button';
import { ReactComponent as CameraIcon } from 'assets/icons/cameraIcon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';
import defaultProfileHeaderImage from 'assets/images/defaultProfileHeaderImage.png';
import useForm from 'hooks/useForm';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from 'shared/utils/validators';
import styles from 'users/components/TweetEditProfileModal/TweetEditProfileModal.module.scss';

function TweetEditProfileModal({ profileHeaderImage, avatar }) {
  const { currentUser } = useAuth();
  const { updateUserProfile } = useUsers();
  const nameInitialValue = currentUser?.name;
  const introInitialValue = currentUser?.introduction;
  const navigate = useNavigate();

  const initialFormInputs = {
    name: {
      val: '',
      isValid: false,
    },
    intro: {
      val: '',
      isValid: false,
    },
  };
  const [formState, handleInput] = useForm(initialFormInputs, false);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: formState.inputs.name.val,
      introduction: formState.inputs.intro.val,
      avatar,
      cover_image: profileHeaderImage,
    });

    navigate(-1);
  };

  return (
    <div className={styles.userProfileHeader}>
      <div className={styles.headerImageContainer}>
        <div className={styles.headerImageBlock} />
        <div
          className={styles.headerImage}
          style={{
            backgroundImage: `url(${
              profileHeaderImage || defaultProfileHeaderImage
            })`,
          }}
        />
        <div className={styles.headerImageIconContainer}>
          <CameraIcon className={styles.cameraIcon} />
          <CloseIcon className={styles.closeIcon} />
        </div>
      </div>
      <div className={styles.mainUserContent}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarBlock} />
          <Avatar
            className={styles.avatar}
            overlayStyles={styles.overlay}
            image={avatar}
            defaultAvatarStyle={styles.defaultAvatar}
          />
          <div className={styles.avatarIconContainer}>
            <CameraIcon className={styles.cameraIcon} />
          </div>
        </div>
        <form
          action=""
          className={styles.formControl}
          onSubmit={handleSubmitForm}
        >
          <Input
            id="name"
            label="名稱"
            element="input"
            type="text"
            placeholder=""
            initialValue={nameInitialValue}
            initialValid={nameInitialValue.length >= 0}
            currTextLength={formState.inputs.name.val.length || 0}
            maxTextLength="50"
            onInput={handleInput}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
            errorText={
              formState.inputs.name.val.length > 50
                ? '名稱不能超過50個字數'
                : '名稱不能留空白，必須填寫名稱'
            }
            textLength
          />
          <Input
            id="intro"
            label="自我介紹"
            placeholder=""
            initialValue={introInitialValue}
            initialValid={introInitialValue.length >= 0}
            currTextLength={formState.inputs.intro.val.length || 0}
            maxTextLength="160"
            rows="8"
            onInput={handleInput}
            validators={[VALIDATOR_MAXLENGTH(160)]}
            errorText="自我介紹不能超過160個字數"
            textLength
          />
          <div className={styles.formBtnContainer}>
            <Button type="submit" className={styles.formBtn}>
              儲存
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default TweetEditProfileModal;
