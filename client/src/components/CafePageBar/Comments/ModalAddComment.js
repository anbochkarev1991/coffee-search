import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalAddComment.module.css';

const ModalAddComment = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false)

  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      close: () => close(),
    }
  })

  const open = () => {
    setDisplay(true)
  }

  const close = () => {
    setDisplay(false)
  }

  if (display) {
    return ReactDOM.createPortal(<div className={styles.modal_wrapper}>
      <div onClick={close} className={styles.modal_backdrop} />
      <div className={styles.modal_box}>
        <div className={styles.modal_Area}>
        {props.children}
        </div>
      </div>
    </div>, document.getElementById("modal-root"))
  }

  return null;
})

export default ModalAddComment;
