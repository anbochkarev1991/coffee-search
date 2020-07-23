import React from 'react';
import styles from '../../../pages/cafe/cafe.module.css';

export default function Batch() {
  return (
    <>
      <div className={styles.cafeContent}>
        <h2>Кофейная карта:</h2>
        <p>Арабика</p>
        <p>Робуста</p>
      </div>
    </>
  );
}
