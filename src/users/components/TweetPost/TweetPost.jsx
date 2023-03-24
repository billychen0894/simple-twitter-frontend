import { useState } from 'react';
import classNames from 'classnames/bind';

import Avatar from 'shared/components/UIElements/Avatar';
import Button from 'shared/components/UIElements/Button';
import TweetEditor from 'users/components/TweetPost/TweetEditor';
import styles from 'users/components/TweetPost/TweetPost.module.scss';

const cx = classNames.bind(styles);

function TweetPost({ placeholder, image }) {
  const [input, setInput] = useState('');

  const buttonStyles = cx({
    tweetBtn: true,
    active: input !== '',
  });

  const handleInputChange = (e) => {
    setInput(e.target.textContent);
  };

  return (
    <>
      <div className={styles.tweetPost}>
        <Avatar image={image} className={styles.avatar} />
        <div className={styles.tweetPostContainer}>
          <TweetEditor
            placeholder={placeholder}
            onInputChange={handleInputChange}
            inputValue={input}
          />
          <div className={styles.tweetBtnContainer}>
            <Button className={buttonStyles}>推文</Button>
          </div>
        </div>
      </div>
      <hr className={styles.divider} />
    </>
  );
}

export default TweetPost;
