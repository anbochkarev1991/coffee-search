import React from 'react';
import styles from '../../../pages/cafe/cafe.module.css';

export default function Comments() {
  return (
    <>
      <div className={styles.cafeContent}>
        <h2>Отзывы о нашей кофейне:</h2>
        <p>Цены выше среднего, но бариста всегда помнит кофе, который мне нравится</p>
        <p>Место - огонь! Бесплатная вафля, розетки около стола) </p>
      </div>
    </>
  );
}
