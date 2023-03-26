import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import TweetEditor from 'users/components/TweetPost/TweetEditor';
import styles from 'users/components/TweetPost/TweetPost.module.scss';

function TweetPost({ placeholder, image, userId }) {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const handleInputChange = (e) => {
    setInput(e.target.textContent);
  };

  const handleInputTouch = () => {
    setIsTouched(true);
  };

  const handleNavigateProfile = (e) => {
    e.stopPropagation();
    navigate(`/${userId}`);
  };

  return (
    <>
      <div className={styles.tweetPost}>
        <Avatar
          image={image}
          className={styles.avatar}
          onClick={handleNavigateProfile}
        />
        <div className={styles.tweetPostContainer}>
          <TweetEditor
            placeholder={placeholder}
            onInputChange={handleInputChange}
            inputValue={input}
            onInputTouch={handleInputTouch}
          />
          <div className={styles.tweetBtnContainer}>
            {isTouched && input.length >= 140 && (
              <span className={styles.errorText}>字數不可超過140字</span>
            )}
            <Button
              disabled={input === '' || input.length >= 140}
              className={styles.tweetBtn}
            >
              推文
            </Button>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
    </>
  );
}

export default TweetPost;
