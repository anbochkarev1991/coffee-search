import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';
import styles from './ModalAddEvent.module.css';

const ModalAddEvent = forwardRef((props, ref) => {
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
        {props.children}
      </div>
    </div>, document.getElementById("modal-root"))
  }

  return null;
})

export default ModalAddEvent;
