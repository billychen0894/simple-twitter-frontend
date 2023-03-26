import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TweetEditor from 'users/components/TweetPost/TweetEditor';
import Avatar from 'shared/components/UIElements/Avatar';
import Modal from 'shared/components/UIElements/Modal';
import TweetReplyModal from 'users/components/TweetReplyModal/TweetReplyModal';
import TweetEditProfileModal from 'users/components/TweetEditProfileModal/TweetEditProfileModal';
import { ModalContentContext } from 'contexts/ModalContentContext';
import styles from 'users/components/TweetModal/TweetModal.module.scss';
import { usersList } from 'constants/constants';

function TweetModal() {
  const [input, setInput] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const navigate = useNavigate();
  const modalCtx = useContext(ModalContentContext);
  const { modalType } = modalCtx;

  const [userInfo] = usersList.filter((user) => user.userId === 'u1');
  const { profileHeaderImage } = userInfo;

  const handleInputChange = (e) => {
    setInput(e.target.textContent);
  };

  const handleInputTouch = () => {
    setIsTouched(true);
  };

  const handleCloseTweetModal = () => {
    navigate(-1);
  };

  // getTweetById(): should have an API that retrieve data based on the tweetId
  // const tweetId = 't1';
  // const userId = 'u1';

  let content;
  if (modalType === 'compose') {
    content = (
      <>
        <Avatar className={styles.avatar} />
        <div className={styles.tweetPostContainer}>
          <TweetEditor
            placeholder="有什麼新鮮事?"
            onInputChange={handleInputChange}
            onInputTouch={handleInputTouch}
            inputValue={input}
          />
        </div>
      </>
    );
  }

  if (modalType === 'reply') {
    content = (
      <TweetReplyModal
        name="Apple"
        userName="apple"
        time="3 小時"
        userToReply="apple"
        tweetContent="Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
        onInputChange={handleInputChange}
        onInputTouch={handleInputTouch}
        inputValue={input}
      />
    );
  }

  if (modalType === 'edit') {
    return (
      <Modal
        inputValue={input}
        handleCloseModal={handleCloseTweetModal}
        overrideDefaultBtn
        modalTitle="編輯個人資料"
        dividerNone
      >
        <div className={`${styles.modalMainContent} ${styles.editModal}`}>
          <TweetEditProfileModal profileHeaderImage={profileHeaderImage} />
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      btnLabel="推文"
      inputValue={input}
      onTouch={isTouched}
      handleCloseModal={handleCloseTweetModal}
    >
      <div className={styles.modalMainContent}>{content}</div>
    </Modal>
  );
}
export default TweetModal;
