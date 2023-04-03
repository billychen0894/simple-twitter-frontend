import { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import TweetEditor from 'users/components/TweetPost/TweetEditor';
import Avatar from 'shared/components/UIElements/Avatar';
import Modal from 'shared/components/UIElements/Modal';
import TweetReplyModal from 'users/components/TweetReplyModal/TweetReplyModal';
import TweetEditProfileModal from 'users/components/TweetEditProfileModal/TweetEditProfileModal';
import { ModalContentContext } from 'contexts/ModalContentContext';
import styles from 'users/components/TweetModal/TweetModal.module.scss';
import { useTweets } from 'contexts/TweetsContext';
import { formattingTime } from 'shared/utils/formattingTime';
import { MoonLoader } from 'react-spinners';
import { useAuth } from 'contexts/AuthContext';
import { useUsers } from 'contexts/UsersContext';

function TweetModal() {
  const navigate = useNavigate();
  const modalCtx = useContext(ModalContentContext);
  const [input, setInput] = useState('');
  const [isTouched, setIsTouched] = useState(false);
  const { createTweet, createReply, currentTweet, isCurrentTweetLoading } =
    useTweets();
  const { modalType, modalReplyTweetId } = modalCtx;
  const { fetchUserTweets } = useUsers();
  const { currentUser } = useAuth();
  const location = useLocation();

  const handleInputChange = (e) => {
    setInput(e.target.textContent);
  };

  const handleInputTouch = () => {
    setIsTouched(true);
  };

  const handleCloseTweetModal = () => {
    navigate(-1);
  };

  const handleSubmitTweet = async () => {
    if (input !== '' && input.length < 140) {
      await createTweet({ description: input });
    }

    if (location?.state?.background.pathname === '/setting') {
      navigate('/home');
    } else {
      navigate(-1);
    }

    if (location?.state?.background.pathname === `/${currentUser?.id}`) {
      await fetchUserTweets(currentUser?.id);
    }
  };

  const handleSubmitTweetReply = () => {
    if (input !== '' && input.length < 140) {
      createReply(modalReplyTweetId, { comment: input });
    }
    navigate(-1);
  };

  let content;
  let action;

  if (modalType === 'compose') {
    content = (
      <>
        <Avatar className={styles.avatar} image={currentUser?.avatar} />
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
    action = handleSubmitTweet;
  }

  if (modalType === 'reply') {
    content = !isCurrentTweetLoading ? (
      <TweetReplyModal
        name={currentTweet?.User.name}
        username={currentTweet?.User.account}
        avatar={currentTweet?.User.avatar}
        time={formattingTime(currentTweet?.createdAt)}
        userToReply={currentTweet?.User.name}
        tweetContent={currentTweet?.description}
        onInputChange={handleInputChange}
        onInputTouch={handleInputTouch}
        inputValue={input}
      />
    ) : (
      <MoonLoader
        color="#FF974A"
        speedMultiplier={1}
        className={styles.spinner}
      />
    );
    action = handleSubmitTweetReply;
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
          <TweetEditProfileModal
            profileHeaderImage={currentUser?.coverImage}
            avatar={currentUser?.avatar}
          />
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
      onClick={action}
    >
      <div className={styles.modalMainContent}>{content}</div>
    </Modal>
  );
}
export default TweetModal;
