import { createContext, useMemo, useState } from 'react';

const defaultModalContentContext = {
  modalType: '',
  handleModalClick: () => {},
};

export const ModalContentContext = createContext(defaultModalContentContext);

function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
  const [modalReplyTweetId, setModalReplyTweetId] = useState(null);

  const handleModalClick = (type) => {
    setModalContent(type);
  };

  const handleModalReplyTweetId = (tweetId) => {
    setModalReplyTweetId(tweetId);
  };

  const modalContentContext = useMemo(
    () => ({
      modalType: modalContent,
      modalReplyTweetId,
      handleModalClick,
      handleModalReplyTweetId,
    }),
    [modalContent, modalReplyTweetId]
  );

  return (
    <ModalContentContext.Provider value={modalContentContext}>
      {children}
    </ModalContentContext.Provider>
  );
}

export default ModalProvider;
