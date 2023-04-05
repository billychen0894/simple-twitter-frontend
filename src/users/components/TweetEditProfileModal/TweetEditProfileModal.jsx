import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';

import { useUsers } from 'contexts/UsersContext';
import useForm from 'hooks/useForm';
import Avatar from 'shared/components/UIElements/Avatar';
import Input from 'shared/components/UIElements/Input';
import Button from 'shared/components/UIElements/Button';
import { ReactComponent as CameraIcon } from 'assets/icons/cameraIcon.svg';
import { ReactComponent as CloseIcon } from 'assets/icons/closeIcon.svg';
import defaultProfileHeaderImage from 'assets/images/defaultProfileHeaderImage.png';
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_REQUIRE,
} from 'shared/utils/validators';
import styles from 'users/components/TweetEditProfileModal/TweetEditProfileModal.module.scss';

function TweetEditProfileModal() {
  const { user, setUser, fetchUserTweets } = useUsers();
  const { updateUserProfile } = useUsers();
  const [userProfileInputError, setUserProfileInputError] = useState(false);
  const navigate = useNavigate();
  const nameInitialValue = user?.name || '';
  const introInitialValue = user?.introduction || '';
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarBase64, setAvatarBase64] = useState(user?.avatar || '');

  const [coverImageFile, setCoverImageFile] = useState(null);
  const [coverImageBase64, setCoverImageBase64] = useState(
    user?.coverImage || ''
  );

  async function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleFileInputChange = async (event, inputId) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    const base64Data = await readFileAsDataURL(file);

    if (inputId === 'avatar') {
      setAvatarFile(file);
      setAvatarBase64(base64Data);
    } else if (inputId === 'coverImage') {
      setCoverImageFile(file);
      setCoverImageBase64(base64Data);
    }
  };

  const initialFormInputs = {
    name: {
      val: nameInitialValue,
      isValid: nameInitialValue.length >= 0,
    },
    intro: {
      val: introInitialValue,
      isValid: introInitialValue.length >= 0,
    },
  };
  const [formState, handleInput] = useForm(initialFormInputs, false);
  const [uploadedAvatarImage, setUploadedAvatarImage] = useState(null);

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formState.formIsValid) {
      toast.error('請輸入正確資料');
      return;
    }

    const formData = new FormData();
    formData.append('name', formState.inputs.name.val);
    formData.append('introduction', formState.inputs.intro.val);
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    } else {
      formData.append('avatarBase64', avatarBase64);
    }
    if (coverImageFile) {
      formData.append('cover_image', coverImageFile);
    } else {
      formData.append('coverImageBase64', coverImageBase64);
    }

    try {
      const uploadPromise = updateUserProfile(formData);
      toast.promise(uploadPromise, {
        pending: '正在上傳中...',
        success: '編輯成功!',
        error: '上傳出現錯誤，請稍後再試！',
      });
      const { success } = await uploadPromise;

      if (!success) {
        setUserProfileInputError(true);
        toast.error('編輯失敗');
        return;
      }

      let newCoverImage;
      let newAvatarImage;

      if (success) {
        if (avatarFile) {
          newAvatarImage = URL.createObjectURL(avatarFile);
        }

        if (coverImageFile) {
          newCoverImage = URL.createObjectURL(coverImageFile);
          setUser((prev) => {
            return { ...prev, coverImage: newCoverImage };
          });
        }

        setUploadedAvatarImage(newAvatarImage);
        navigate(-1);
        await fetchUserTweets(user?.id);
      }
    } catch (error) {
      toast.error('出現錯誤，請稍後再試！');
    }
  };

  return (
    <div className={styles.userProfileHeader}>
      <div className={styles.headerImageContainer}>
        <div className={styles.headerImageBlock} />
        <div
          className={styles.headerImage}
          style={{
            backgroundImage: `url(${
              coverImageBase64 || defaultProfileHeaderImage
            })`,
          }}
        />
        <div className={styles.headerImageIconContainer}>
          <label htmlFor="coverImage">
            <input
              id="coverImage"
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={(e) => handleFileInputChange(e, 'coverImage')}
              style={{ display: 'none' }}
            />
            <CameraIcon className={styles.cameraIcon} />
          </label>
          <CloseIcon className={styles.closeIcon} />
        </div>
      </div>
      <div className={styles.mainUserContent}>
        <div className={styles.avatarContainer}>
          <div className={styles.avatarBlock} />
          <Avatar
            className={styles.avatar}
            overlayStyles={styles.overlay}
            image={uploadedAvatarImage || avatarBase64 || undefined}
            defaultAvatarStyle={styles.defaultAvatar}
          />
          <div className={styles.avatarIconContainer}>
            <label htmlFor="avatar">
              <input
                id="avatar"
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={(e) => handleFileInputChange(e, 'avatar')}
                style={{ display: 'none' }}
              />
              <CameraIcon className={styles.cameraIcon} />
            </label>
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
            placeholder=" "
            initialValue={nameInitialValue}
            initialValid={nameInitialValue.length >= 0}
            currTextLength={formState.inputs.name.val.length || 0}
            maxTextLength="50"
            onInput={handleInput}
            validators={[VALIDATOR_REQUIRE(), VALIDATOR_MAXLENGTH(50)]}
            errorText={
              formState.inputs.name.val.length > 50
                ? '字數超出上限'
                : '名稱不能留空白，必須填寫名稱'
            }
            textLength
            inputStyles={`${styles.input} ${
              userProfileInputError ? styles.formInvalid : undefined
            }`}
            onInputChangeStyle={setUserProfileInputError}
          />
          <Input
            id="intro"
            label="自我介紹"
            placeholder=" "
            initialValue={introInitialValue}
            initialValid={introInitialValue.length >= 0}
            currTextLength={formState.inputs.intro.val.length || 0}
            maxTextLength="160"
            rows="8"
            onInput={handleInput}
            validators={[VALIDATOR_MAXLENGTH(160)]}
            errorText="字數超出上限"
            textLength
            inputStyles={`${styles.input} ${
              userProfileInputError ? styles.formInvalid : undefined
            }`}
            onInputChangeStyle={setUserProfileInputError}
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
