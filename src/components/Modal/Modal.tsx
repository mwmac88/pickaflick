import React from 'react';

import CloseIcon from '@material-ui/icons/Close';

interface Props {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ children, setModalVisible }) => (
  <div className='fixed flex justify-center items-center top-0 left-0 w-screen h-screen bg-opaque70 z-20'>
    <div className='modal-centred fixed bg-white w-3/4 min-h-3/4 translate-x-1/2 translate-y-1/2'>
      <div className='text-center'>{children}</div>
      <CloseIcon
        onClick={() => setModalVisible(false)}
        className='absolute top-2 right-2 cursor-pointer'
        fontSize='large'
      />
    </div>
  </div>
);

export default Modal;
