import { createContext, useMemo, useState } from 'react';

const defaultModalContentContext = {
  modalType: '',
  handleModalClick: () => {},
};

export const ModalContentContext = createContext(defaultModalContentContext);

function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);

  const handleModalClick = (type) => {
    setModalContent(type);
  };

  const modalContentContext = useMemo(
    () => ({
      modalType: modalContent,
      handleModalClick,
    }),
    [modalContent]
  );

  return (
    <ModalContentContext.Provider value={modalContentContext}>
      {children}
    </ModalContentContext.Provider>
  );
}

export default ModalProvider;
